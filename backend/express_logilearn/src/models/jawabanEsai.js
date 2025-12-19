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

async function createJwbEsai(idAttempt, idSoal, ) {
    
}