const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const response = require('../helpers/response');
const bcrypt = require('bcryptjs');

const getProfile = async (req, res) => {
  try {
    const pelajarId = req.auth.id;

    const pelajar = await prisma.pelajars.findUnique({
      where: { id: pelajarId },
      select: { nama: true, username: true }
    });

    if (!pelajar) {
      return response(404, null, "Pelajar tidak ditemukan", res);
    }

    const lulusAttempts = await prisma.attempts.groupBy({
      by: ['id_level'],
      where: {
        id_pelajar: pelajarId,
        skor: { gte: 75 }
      }
    });
    const levelSelesaiCount = lulusAttempts.length;

    const allSections = await prisma.sections.findMany({
      include: { 
        levels: { select: { id: true } } 
      }
    });

    let sectionSelesaiCount = 0;
    const lulusLevelIds = lulusAttempts.map(attempt => attempt.id_level);

    allSections.forEach(section => {
      if (section.levels.length > 0) {
        const isAllLevelPassed = section.levels.every(lvl => lulusLevelIds.includes(lvl.id));
        if (isAllLevelPassed) {
          sectionSelesaiCount++;
        }
      }
    });

    const dataProfile = {
      nama: pelajar.nama,
      username: pelajar.username,
      statistik: {
        section_selesai: sectionSelesaiCount,
        level_selesai: levelSelesaiCount
      }
    };

    return response(200, dataProfile, "Data profil berhasil dimuat", res);
  } catch (error) {
    return response(500, null, `Terjadi kesalahan: ${error.message}`, res);
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const pelajarId = req.auth.id;

    const pelajar = await prisma.pelajars.findUnique({
      where: { id: pelajarId }
    });

    const isMatch = await bcrypt.compare(oldPassword, pelajar.password);
    if (!isMatch) {
      return response(401, null, "Kata sandi saat ini salah", res);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.pelajars.update({
      where: { id: pelajarId },
      data: { password: hashedPassword }
    });

    return response(200, null, "Kata sandi berhasil diganti", res);
  } catch (error) {
    return response(500, null, error.message, res);
  }
};

module.exports = { 
  getProfile, 
  changePassword 
};