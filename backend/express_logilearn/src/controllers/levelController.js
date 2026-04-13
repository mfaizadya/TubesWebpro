const Level = require('../models/level')
const response = require('../helpers/response')
const axios = require('axios')

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

async function fetchLevels(req, res) {
    try {
        const {slugSection} = req.params
        const resp = await axios.get(`http://localhost:8000/getLevel.php?slug=${slugSection}`)
        if(!resp){
            return response(404, null, `data not found`, res)
        }
        response(200, resp.data.data, `get all levels`, res)
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

async function getSoalsByLevel(req, res) {
    try {
        const {slugSection, id} = req.params
        console.log(`getSoalsByLevel called: slugSection=${slugSection}, levelId=${id}`)
        const data = await Level.getSoalsByLevelId(slugSection, id)
        console.log(`getSoalsByLevel result: found ${data ? data.length : 0} soals`)
        if(!data || data.length === 0){
            return response(200, [], `no soals found for level: ${id} in section: ${slugSection}`, res)
        }
        response(200, data, `get soals by level: ${id}`, res)
    } catch(err) {
        console.log(`getSoalsByLevel error: ${err.message}`)
        response(500, null, `failed to get soals by level: ${err.message}`, res)
    }
}

async function getSoalByLevelAndId(req, res) {
    try {
        const {slugSection, id, idSoal} = req.params
        const levelId = Number(id)
        const soalId = Number(idSoal)
        
        console.log(`getSoalByLevelAndId called:`)
        console.log(`  - slugSection: ${slugSection}`)
        console.log(`  - levelId (raw): ${id}, (parsed): ${levelId}`)
        console.log(`  - soalId (raw): ${idSoal}, (parsed): ${soalId}`)
        console.log(`  - All params:`, req.params)
        
        // First check if level exists in the requested section
        const levelInSection = await Level.getLevelsBySectionId(slugSection, levelId)
        console.log(`  - levelInSection check: ${levelInSection ? 'found' : 'not found'}`)
        
        if (!levelInSection) {
            // Check if level exists in another section
            const levelAnywhere = await Level.getLevelById(levelId)
            console.log(`  - levelAnywhere check: ${levelAnywhere ? 'found' : 'not found'}`)
            if (levelAnywhere) {
                console.log(`  - Level ${levelId} exists but not in section ${slugSection}`)
                return response(404, null, `level ${levelId} not found in section ${slugSection}. Level ${levelId} exists in a different section.`, res)
            } else {
                console.log(`  - Level ${levelId} does not exist at all`)
                return response(404, null, `level ${levelId} not found`, res)
            }
        }
        
        const data = await Level.getSoalByLevelIdAndSoalId(slugSection, levelId, soalId)
        console.log(`getSoalByLevelAndId result: ${data ? 'found' : 'not found'}`)
        if(!data){
            // Check if soal exists but in different level
            const prisma = require('../config/prisma')
            const soalExists = await prisma.soals.findUnique({
                where: { id: soalId }
            })
            if (soalExists) {
                console.log(`  - Soal ${soalId} exists but in level ${soalExists.id_level}, not level ${levelId}`)
                return response(404, null, `soal with id ${soalId} not found in level ${levelId} of section ${slugSection}. Soal exists in level ${soalExists.id_level}.`, res)
            } else {
                console.log(`  - Soal ${soalId} does not exist at all`)
                return response(404, null, `soal with id ${soalId} not found in level ${levelId} of section ${slugSection}`, res)
            }
        }
        response(200, data, `get soal by level: ${levelId} and soal id: ${soalId}`, res)
    } catch(err) {
        console.log(`getSoalByLevelAndId error: ${err.message}`)
        console.log(`getSoalByLevelAndId error stack: ${err.stack}`)
        response(500, null, `failed to get soal: ${err.message}`, res)
    }
}

module.exports = {
    fetchLevels,
    getAll,
    getAllBySection,
    getBySectionId,
    getById,
    create,
    update,
    remove,
    getSoalsByLevel,
    getSoalByLevelAndId
}