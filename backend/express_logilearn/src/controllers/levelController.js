const Level = require('../models/level')
const response = require('../helpers/response')

async function create(req, res) {
    try {
        const {nama, idSection} = req.body
        const data = await Level.createLevel(idSection, nama)
        response(200, data, `successfully`, res)
    } catch(err) {
        console.log(err.message)
        response(500, null, `failed to : ${err.message}`, res)
    }
}

async function getAll(req, res) {
    try {
        const data = await Level.getAllLevels()
        if(!data){
            return response(404, null, `data not found`, res)
        }
        response(200, data, `get all levels`, res)
    } catch(err) {
        console.log(err.message)
        response(500, null, `failed to : ${err.message}`, res)
    }
}

async function getAllBySection(req, res) {
    try {
        const {slugSection} = req.params
        const data = await Level.getLevelsBySection(slugSection)
        if(!data){
            return response(404, null, `data not found`, res)
        }
        response(200, data, `get all levels by section" ${slugSection}`, res)
    } catch(err) {
        console.log(err.message)
        response(500, null, `failed to : ${err.message}`, res)
    }
}

async function getBySectionId(req, res) {
    try {
        const {slugSection, id} = req.params
        const data = await Level.getLevelsBySectionId(slugSection, id)
        if(!data){
            return response(404, null, `data not found`, res)
        }
        response(200, data, `get all levels by section" ${slugSection}`, res)
    } catch(err) {
        console.log(err.message)
        response(500, null, `failed to : ${err.message}`, res)
    }
}

async function getById(req, res) {
    try {
        const {id} = req.params
        const data = await Level.getLevelById(id)
        if(!data){
            return response(404, null, `data not found`, res)
        }
        response(200, data, `get level by id: ${id}`, res)
    } catch(err) {
        console.log(err.message)
        response(500, null, `failed to get level by id: ${err.message}`, res)
    }
}

async function update(req, res) {
    try {
        const {id} = req.params
        const {nama, idSection} = req.body
        const data = await Level.getLevelById(id)
        if(!data){
            return response(404, null, `data not found`, res)
        }
        const updated = await Level.updateLevel(id, idSection, nama)
        response(200, updated, `level updated successfully`, res)
    } catch(err) {
        console.log(err.message)
        response(500, null, `failed to update level: ${err.message}`, res)
    }
}

async function remove(req, res) {
    try {
        const {id} = req.params
        const data = await Level.getLevelById(id)
        if(!data){
            return response(404, null, `data not found`, res)
        }
        await Level.deleteLevel(id)
        response(200, null, `level deleted successfully`, res)
    } catch(err) {
        console.log(err.message)
        response(500, null, `failed to delete level: ${err.message}`, res)
    }
}
module.exports = {
    getAll,
    getAllBySection,
    getBySectionId,
    getById,
    create,
    update,
    remove
}