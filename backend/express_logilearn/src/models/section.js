const prisma = require('./prisma')

async function getAllSections() {
    return prisma.sections.findMany({
        include: {
            levels: true
        }
    })
}

async function getSectionById(id) {
    return prisma.sections.findUnique({
        where:{
            id: Number(id)
        },
        include: {
            levels: true
        }
    })
}

async function createSection(nama) {
    return prisma.sections.create({
        data: {
            nama: nama
        }
    })
}

async function updateSection(id, nama) {
    return prisma.sections.update({
        where: {
            id: Number(id)
        },
        data: {
            nama: nama
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