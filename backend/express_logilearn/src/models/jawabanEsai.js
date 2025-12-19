const prisma = require('./prisma')

async function getAllJwbEsais() {
    return prisma.jawabanEsais.findMany()
}

async function getJwbEsaiById(id) {
    return prisma.jawabanEsais.findUnique({
        where: {
            id: Number(id)
        }
    })
}

async function createJwbEsai(idAttempt, idSoal, jawabanEsai) {
    return prisma.jawabanEsais.create({
        data: {
            id_attempt: Number(idAttempt),
            id_soal: Number(idSoal),
            text_jawaban_esai: jawabanEsai,
            skor: 0
        }
    })
}

async function updateJwbEsai(id, skor) {
    return prisma.jawabanEsais.update({
        where: {
            id: Number(id)
        },
        data: {
            skor: skor
        }
    })
}

module.exports = {
    getAllJwbEsais,
    getJwbEsaiById,
    createJwbEsai,
    updateJwbEsai
}