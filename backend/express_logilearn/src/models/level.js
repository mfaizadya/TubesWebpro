const prisma = require('./prisma')

async function getAllLevels() {
    return prisma.levels.findMany()
}

async function getLevelById(id) {
    return prisma.levels.findUnique({
        where: {
            id: Number(id)
        }
    })
}

async function createLevel(idSection, name) {
    return prisma.levels.create({
        data: {
            id_section: Number(idSection),
            name: name
        }
    })
}

async function updateLevel(id, idSection, name) {
    return prisma.levels.update({
        where: {
            id: Number(id)
        },
        data: {
            id_section: Number(idSection),
            name: name
        }
    })
}

async function deleteLevel(id) {
    return prisma.levels.delete({
        where: {
            id: Number(id)
        }
    })
}

module.exports = {
    getAllLevels,
    getLevelById,
    createLevel,
    updateLevel,
    deleteLevel
}