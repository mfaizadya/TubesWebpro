const response = require('../helpers/response');
const Attempt = require('../models/attempt');
const Level = require('../models/level');
const aiGrading = require('../services/aiGrading');

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

async function create(req, res) {
  try {
    let { id_level, id_pelajar, skor } = req.body;

    if (req.auth && req.auth.type === 'PELAJAR') {
      id_pelajar = req.auth.id;
      if (skor === undefined) skor = 0;
    }

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

async function submitAttempt(req, res) {
  try {
    let { id_attempt } = req.body;
    
    if (!id_attempt) {
       return response(400, null, 'id_attempt harus diisi', res);
    }

    const updatedAttempt = await Attempt.recalculateScore(id_attempt);

    if (!updatedAttempt) {
      return response(404, null, 'Attempt tidak ditemukan', res);
    }

    response(200, updatedAttempt, 'Attempt submitted (score recalculated) successfully', res);

  } catch (error) {
    console.log(error.message);
    response(500, null, `Terjadi kesalahan server: ${error.message}`, res);
  }
}

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
