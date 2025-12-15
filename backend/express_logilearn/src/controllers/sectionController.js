const Section = require('../models/section')
const response = require('../helpers/response')

async function getAll(req, res) {
    try {
        const data = await Section.getAllSections()
        if (!data){
            return response(404, null, `data not found`, res)
        }
        response(200, data, `get all sections`, res)
    } catch (err) {
        console.log(err.message)
        response(500, null, `failed to get all sections: ${err.message}`, res)
    }
}

async function getById(req, res) {
    try {
        const {id} = req.params
        const data = await Section.getSectionById(id)
        if (!data){
            return response(404, null, `data not found`, res)
        }
        response(200, data, `get section by id: ${id}`, res)
    } catch (err) {
        response(500, null, `failed to get section by id: ${err.message}`, res)
    }
}

async function create(req, res) {
    try {
        const {name} = req.body
        const data = await Section.createSection(name)
        response(200, data, `section created successfully`, res)
    } catch (err){
        console.log(err.message)
        response(500, null, `failed to create section: ${err.message}`, res)
    }
}

async function update(req, res) {
    try {
        const {id} = req.params
        const {name} = req.body
        const data = await Section.getSectionById(id)
        if (!data){
            return response(404, null, `data not found`, res)
        }
        const updated = await Section.updateSection(id,name)
        response(200, updated, `section updated successfully`, res)
    } catch (err){
        console.log(err.message)
        response(500, null, `failed to update section: ${err.message}`, res)
    }
}

async function remove(req, res) {
    try {
        const {id} = req.params
        const data = await Section.getSectionById(id)
        if (!data){
            return response(404, null, `data not found`, res)
        }
        await Section.deleteSection(id)
        response(200, null, `section deleted successfully`, res)
    } catch (err) {
        console.log(err.message)
        response(500, null, `failed to delete section: ${err.message}`, res)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}