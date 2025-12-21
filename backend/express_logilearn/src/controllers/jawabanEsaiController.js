const { nilaiEsai } = require('../services/aiGrading')
const Soal = require('../models/soalesai')
const JwbEsai = require('../models/jawabanEsai')
const Attempt = require('../models/attempt')
const response = require('../helpers/response')

async function create(req, res) {
  try {
    const { jawaban } = req.body
    const { idSoal, idAttempt } = req.params

    const soalData = await Soal.getSoalEsaiById(idSoal)
    const soal = soalData.text_soal

    const result = await nilaiEsai(soal, jawaban)

    const data = await JwbEsai.createJwbEsai(
      idAttempt,
      idSoal,
      jawaban,
      result.score
    )

    // Recalculate attempt score
    await Attempt.recalculateScore(idAttempt)

    response(200, data, "successfully", res)
  } catch (err) {
    console.error(err.message)
    response(500, null, `failed to : ${err.message}`, res)
  }
}


async function getAll(req, res) {
    try {
        const data = await JwbEsai.getAllJwbEsais()
        response(200, data, `successfully`, res)
    } catch(err) {
        console.log(err.message)
        response(500, null, `failed to : ${err.message}`, res)
    } 
}

async function getById(req, res) {
    try {
        const { id } = req.params
        const data = await JwbEsai.getJwbEsaiById(id)
        response(200, data, `successfully`, res)
    } catch(err) {
        console.log(err.message)
        response(500, null, `failed to : ${err.message}`, res)
    } 
}

async function update(req, res) {
    try {
        const { idJwbEsai } = req.params
        const { idAdmin, skor } = req.body
        data = await JwbEsai.updateJwbEsai(idJwbEsai, idAdmin, skor)
        response(200, data, `successfully`, res)
    } catch(err) {
        console.log(err.message)
        response(500, null, `failed to : ${err.message}`, res)
    } 
}

module.exports = {
    create,
    getAll,
    getById,
    update
}