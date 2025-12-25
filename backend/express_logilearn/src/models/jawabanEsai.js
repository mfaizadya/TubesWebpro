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

async function createJwbEsai(idAttempt, idSoal, jawabanEsai, skor, feedback) {
    return prisma.jawabanEsais.create({
        data: {
            id_attempt: Number(idAttempt),
            id_soal: Number(idSoal),
            text_jawaban_esai: jawabanEsai,
            skor: skor,
            feedback: feedback
        }
    })
}

async function updateJwbEsai(id, idAdmin, skor, feedback) {
    return prisma.jawabanEsais.update({
        where: {
            id: Number(id)
        },
        data: {
            id_admin: idAdmin,
            skor: skor,
            feedback: feedback
        }
    })
}

module.exports = {
    getAllJwbEsais,
    getJwbEsaiById,
    createJwbEsai,
    updateJwbEsai
}