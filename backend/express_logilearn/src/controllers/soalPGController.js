const SoalPG = require('../models/soalPG')
const response = require('../helpers/response')

async function getAll(req, res) {
    try {
        const data = await SoalPG.getAllSoalPG()
        if (!data || data.length === 0) {
            return response(200, [], `no soal PG found`, res)
        }
        response(200, data, `get all soal PG`, res)
    } catch (err) {
        console.log(err.message)
        response(500, null, `failed to get all soal PG: ${err.message}`, res)
    }
}

async function getById(req, res) {
    try {
        const { id } = req.params
        const data = await SoalPG.getSoalPGById(id)
        if (!data) {
            return response(404, null, `soal PG not found`, res)
        }
        response(200, data, `get soal PG by id: ${id}`, res)
    } catch (err) {
        response(500, null, `failed to get soal PG by id: ${err.message}`, res)
    }
}

async function getByLevel(req, res) {
    try {
        const { idLevel } = req.params
        const data = await SoalPG.getSoalPGByLevel(idLevel)
        if (!data || data.length === 0) {
            return response(200, [], `no soal PG found for level: ${idLevel}`, res)
        }
        response(200, data, `get soal PG by level: ${idLevel}`, res)
    } catch (err) {
        response(500, null, `failed to get soal PG by level: ${err.message}`, res)
    }
}

async function create(req, res) {
    try {
        const { id_level, text_soal, opsi } = req.body
        
        if (!id_level || !text_soal || !opsi || !Array.isArray(opsi) || opsi.length === 0) {
            return response(400, null, `missing or invalid required fields: id_level, text_soal, opsi (array)`, res)
        }

        if (opsi.length < 2) {
            return response(400, null, `minimal opsi jawaban harus 2`, res)
        }

        if (!opsi.some(o => o.is_correct)) {
            return response(400, null, `harus ada minimal 1 jawaban yang benar`, res)
        }

        const data = await SoalPG.createSoalPG(id_level, text_soal, opsi)
        response(200, data, `soal PG created successfully`, res)
    } catch (err) {
        console.log(err.message)
        response(500, null, `failed to create soal PG: ${err.message}`, res)
    }
}

async function update(req, res) {
    try {
        const { id } = req.params
        const { text_soal, opsi } = req.body

        if (!text_soal || !opsi || !Array.isArray(opsi) || opsi.length === 0) {
            return response(400, null, `missing or invalid required fields: text_soal, opsi (array)`, res)
        }

        if (opsi.length < 2) {
            return response(400, null, `minimal opsi jawaban harus 2`, res)
        }

        if (!opsi.some(o => o.is_correct)) {
            return response(400, null, `harus ada minimal 1 jawaban yang benar`, res)
        }

        const data = await SoalPG.getSoalPGById(id)
        if (!data) {
            return response(404, null, `soal PG not found`, res)
        }

        const updated = await SoalPG.updateSoalPG(id, text_soal, opsi)
        response(200, updated, `soal PG updated successfully`, res)
    } catch (err) {
        console.log(err.message)
        response(500, null, `failed to update soal PG: ${err.message}`, res)
    }
}

async function deleteHandler(req, res) {
    try {
        const { id } = req.params
        const data = await SoalPG.getSoalPGById(id)
        if (!data) {
            return response(404, null, `soal PG not found`, res)
        }
        const deleted = await SoalPG.deleteSoalPG(id)
        response(200, deleted, `soal PG deleted successfully`, res)
    } catch (err) {
        console.log(err.message)
        response(500, null, `failed to delete soal PG: ${err.message}`, res)
    }
}

module.exports = {
    getAll,
    getById,
    getByLevel,
    create,
    update,
    delete: deleteHandler
}
