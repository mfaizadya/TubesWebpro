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

async function createLevel(idSection, nama) {
    return prisma.levels.create({
        data: {
            id_section: Number(idSection),
            nama: nama
        }
    })
}

async function updateLevel(id, idSection, nama) {
    return prisma.levels.update({
        where: {
            id: Number(id)
        },
        data: {
            id_section: Number(idSection),
            nama: nama
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