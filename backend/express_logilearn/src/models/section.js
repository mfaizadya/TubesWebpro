const prisma = require('./prisma')

async function getAllSections() {
    prisma.sections.findMany({
        include: {
            levels: true
        }
    })
}

async function getSectionById(id) {
    prisma.sections.findUnique({
        where:{
            id: Number(id)
        },
        include: {
            levels: true
        }
    })
}

async function createSection(name) {
    prisma.sections.create({
        data: {
            name: name
        }
    })
}

async function updateSection(id, name) {
    prisma.sections.update({
        where: {
            id: Number(id)
        },
        data: {
            name: name
        }
    })
}

async function deleteSection(id) {
    return prisma.sections.delete({
        where: {
            id: Number(id)
        }
    })
}

module.exports = {
    getAllSections,
    getSectionById,
    createSection,
    updateSection,
    deleteSection
}