const response = require('../helpers/response');
const Attempt = require('../models/attempt');
const Level = require('../models/level');
const aiGrading = require('../services/aiGrading');

// Get all attempts
async function getAllAttempts(req, res) {
  try {
    const data = await Attempt.getAllAttempts();
    if (!data || data.length === 0) {
      return response(404, null, 'Tidak ada attempt ditemukan', res);
    }
    response(200, data, 'Berhasil mendapatkan semua attempt', res);
  } catch (error) {
    console.log(error.message);
    response(500, null, `Terjadi kesalahan server: ${error.message}`, res);
  }
}

// Get attempt by ID
async function getAttemptById(req, res) {
  try {
    const { id } = req.params;
    const data = await Attempt.getAttemptById(id);
    if (!data) {
      return response(404, null, 'Attempt tidak ditemukan', res);
    }
    response(200, data, `Berhasil mendapatkan attempt dengan id: ${id}`, res);
  } catch (error) {
    console.log(error.message);
    response(500, null, `Terjadi kesalahan server: ${error.message}`, res);
  }
}

// Get attempts by level
async function getAttemptsByLevel(req, res) {
  try {
    const { levelId } = req.params;
    const data = await Attempt.getAttemptsByLevel(levelId);
    if (!data || data.length === 0) {
      return response(404, null, 'Tidak ada attempt untuk level ini', res);
    }
    response(200, data, `Berhasil mendapatkan attempt untuk level: ${levelId}`, res);
  } catch (error) {
    console.log(error.message);
    response(500, null, `Terjadi kesalahan server: ${error.message}`, res);
  }
}

// Get attempts by pelajar
async function getAttemptsByPelajar(req, res) {
  try {
    const { pelajarId } = req.params;
    const data = await Attempt.getAttemptsByPelajar(pelajarId);
    if (!data || data.length === 0) {
      return response(404, null, 'Tidak ada attempt untuk pelajar ini', res);
    }
    response(200, data, `Berhasil mendapatkan attempt untuk pelajar: ${pelajarId}`, res);
  } catch (error) {
    console.log(error.message);
    response(500, null, `Terjadi kesalahan server: ${error.message}`, res);
  }
}

// Create attempt
async function create(req, res) {
  try {
    const { id_level, id_pelajar, skor } = req.body;

    if (!id_level || !id_pelajar || skor === undefined) {
      return response(400, null, 'id_level, id_pelajar, dan skor harus diisi', res);
    }

    const data = await Attempt.createAttempt(id_level, id_pelajar, skor);
    response(200, data, 'Attempt berhasil dibuat', res);
  } catch (error) {
    console.log(error.message);
    response(500, null, `Terjadi kesalahan server: ${error.message}`, res);
  }
}

// Submit Attempt (Auto Grading)
async function submitAttempt(req, res) {
  try {
    const { id_level, id_pelajar, answers } = req.body;

    if (!id_level || !id_pelajar || !answers || !Array.isArray(answers)) {
      return response(400, null, 'id_level, id_pelajar, dan answers (array) harus diisi', res);
    }

    // 1. Get Level Data (Questions & Options)
    const levelData = await Level.getLevelById(id_level);
    if (!levelData) {
      return response(404, null, 'Level tidak ditemukan', res);
    }

    let totalScore = 0;
    const jawabanPGs = [];
    const jawabanEsais = [];

    // 2. Process Answers
    // Note: Use for...of loop for async operations inside
    for (const ans of answers) {
      const soal = levelData.soals.find(s => s.id === parseInt(ans.id_soal));
      
      if (!soal) {
        console.warn(`Soal ID ${ans.id_soal} tidak ditemukan di Level ${id_level}`);
        continue;
      }

      if (soal.tipe === 'pg') {
        const selectedOpsi = soal.opsis.find(o => o.id === parseInt(ans.id_opsi));
        const score = (selectedOpsi && selectedOpsi.is_correct) ? 1.0 : 0.0;
        
        totalScore += score;
        jawabanPGs.push({
          id_opsi: ans.id_opsi,
          skor: score
        });
      } else if (soal.tipe === 'esai') {
        try {
            const aiRes = await aiGrading.nilaiEsai(soal.text_soal, ans.text_jawaban);
            const score = aiRes.score; // 0.0 - 1.0
            
            totalScore += score;
            jawabanEsais.push({
                id_soal: soal.id,
                text_jawaban_esai: ans.text_jawaban,
                skor: score
            });
        } catch (err) {
            console.error(`Error grading essay soal ${soal.id}:`, err.message);
            // Default to 0 if AI fails? or allow manual review later? 
            // For now, let's set 0 but log it.
            jawabanEsais.push({
                id_soal: soal.id,
                text_jawaban_esai: ans.text_jawaban,
                skor: 0.0
            });
        }
      }
    }

    // 3. Calculate Final Percentage
    // Assuming each question is worth 1 point max.
    const maxScore = levelData.soals.length; 
    const finalPercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    // 4. Save to Database
    const attempt = await Attempt.createAttemptWithAnswers(
      id_level,
      id_pelajar,
      finalPercentage,
      jawabanPGs,
      jawabanEsais
    );

    response(200, { attempt, score: finalPercentage }, 'Attempt submitted and graded successfully', res);

  } catch (error) {
    console.log(error.message);
    response(500, null, `Terjadi kesalahan server: ${error.message}`, res);
  }
}

// Update attempt
async function update(req, res) {
  try {
    const { id } = req.params;
    const { skor } = req.body;

    if (skor === undefined) {
      return response(400, null, 'skor harus diisi', res);
    }

    const attempt = await Attempt.getAttemptById(id);
    if (!attempt) {
      return response(404, null, 'Attempt tidak ditemukan', res);
    }

    const data = await Attempt.updateAttempt(id, skor);
    response(200, data, 'Attempt berhasil diupdate', res);
  } catch (error) {
    console.log(error.message);
    response(500, null, `Terjadi kesalahan server: ${error.message}`, res);
  }
}

// Delete attempt
async function remove(req, res) {
  try {
    const { id } = req.params;

    const attempt = await Attempt.getAttemptById(id);
    if (!attempt) {
      return response(404, null, 'Attempt tidak ditemukan', res);
    }

    const data = await Attempt.deleteAttempt(id);
    response(200, data, 'Attempt berhasil dihapus', res);
  } catch (error) {
    console.log(error.message);
    response(500, null, `Terjadi kesalahan server: ${error.message}`, res);
  }
}

module.exports = {
  getAllAttempts,
  getAttemptById,
  getAttemptsByLevel,
  getAttemptsByPelajar,
  create,
  submitAttempt,
  update,
  remove
};
