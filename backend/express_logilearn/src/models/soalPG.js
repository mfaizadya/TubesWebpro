const prisma = require('./prisma')

async function getAllSoalPG() {
    return prisma.soals.findMany({
        where: {
            tipe: 'pg'
        },
        include: {
            opsis: true
        }
    })
}

async function getSoalPGById(id) {
    return prisma.soals.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            opsis: true
        }
    })
}

async function getSoalPGByLevel(idLevel) {
    return prisma.soals.findMany({
        where: {
            id_level: Number(idLevel),
            tipe: 'pg'
        },
        include: {
            opsis: true
        }
    })
}

async function createSoalPG(idLevel, textSoal, opsi) {
    return prisma.soals.create({
        data: {
            id_level: Number(idLevel),
            tipe: 'pg',
            text_soal: textSoal,
            opsis: {
                create: opsi.map(o => ({
                    text_opsi: o.text_opsi,
                    is_correct: o.is_correct
                }))
            }
        },
        include: {
            opsis: true
        }
    })
}

async function updateSoalPG(id, textSoal, opsi) {
    await prisma.opsis.deleteMany({
        where: {
            id_soal: Number(id)
        }
    })

    return prisma.soals.update({
        where: {
            id: Number(id)
        },
        data: {
            text_soal: textSoal,
            opsis: {
                create: opsi.map(o => ({
                    text_opsi: o.text_opsi,
                    is_correct: o.is_correct
                }))
            }
        },
        include: {
            opsis: true
        }
    })
}

async function deleteSoalPG(id) {
    return prisma.soals.delete({
        where: {
            id: Number(id)
        }
    })
}

module.exports = {
    getAllSoalPG,
    getSoalPGById,
    getSoalPGByLevel,
    createSoalPG,
    updateSoalPG,
    deleteSoalPG
}
