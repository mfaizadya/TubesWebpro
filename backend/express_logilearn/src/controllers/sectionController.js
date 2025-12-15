const Section = require('../models/section')
const response = require('../helpers/response')

async function getAll(req, res) {
    try {
        const data = await Section.getAllSections()
        response(200, data, `get all sections`, res)
    } catch (err) {
        console.log(err.message)
        response(500, null, `failed to get all sections: ${err.message}`, res)
    }
}

async function getById(req, res) {
    try {
        const data = await Section.getSectionById(id)
        response(200, data, `get section by id`, res)
    } catch (err) {
        response(500, null, `failed to get section by id: ${err.message}`, res)
    }
}

async function create(req, res) {
    try {
        const {name} = req.body
        const data = await Section.createSection(name)
        console.log(data)
        response(200, data, `section created successfully`, res)
    } catch (err){
        console.log(err.message)
        response(500, null, `failed to create section: ${err.message}`, res)
    }
}

module.exports = {
    getAll,
    getById,
    create
}