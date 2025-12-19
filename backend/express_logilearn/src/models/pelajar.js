const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findPelajarStats = async (id_pelajar) => {
  return await prisma.attempts.findMany({
    where: {
      id_pelajar: id_pelajar,
      skor: { gte: 75 }
    },
    select: { id_level: true }
  });
};

module.exports = { findPelajarStats };