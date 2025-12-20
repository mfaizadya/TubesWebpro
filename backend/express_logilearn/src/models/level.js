const prisma = require('./prisma')

async function getAllLevels() {
    return prisma.levels.findMany({})
}

async function getLevelsBySection(slugSection) {
    return prisma.levels.findMany({
        where: {
            sections: {
                slug: slugSection
            }
        }
    })
}

async function getLevelsBySectionId(slugSection, id) {
    return prisma.levels.findMany({
        where: {
            sections: {
                slug: slugSection
            },
            id: Number(id)
        }
    })
}

async function getLevelById(id) {
    return prisma.levels.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            soals: {
                include: {
                    opsis: true
                }
            }
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
    getLevelsBySectionId,
    getLevelsBySection,
    createLevel,
    updateLevel,
    deleteLevel
}