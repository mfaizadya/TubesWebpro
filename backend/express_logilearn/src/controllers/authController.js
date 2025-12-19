const response = require('../helpers/response');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await prisma.admins.findFirst({
      where: { username: username }
    });

    if (!admin) {
      return response(404, null, "Admin tidak ditemukan", res);
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return response(401, null, "Password salah", res);
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, type: "ADMIN" },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const dataLogin = {
      token: token,
      admin: { id: admin.id, nama: admin.nama }
    };

    return response(200, dataLogin, "Login Berhasil", res);

  } catch (error) {
    return response(500, null, `Terjadi kesalahan server: ${error.message}`, res);
  }
};

const loginPelajar = async (req, res) => {
  try {
    const { username, password } = req.body;

    const pelajar = await prisma.pelajars.findFirst({
      where: { username: username }
    });

    if (!pelajar) {
      return response(404, null, "Pelajar tidak ditemukan", res);
    }

    const isPasswordValid = await bcrypt.compare(password, pelajar.password);
    if (!isPasswordValid) {
      return response(401, null, "Password salah", res);
    }

    const token = jwt.sign(
      { id: pelajar.id, username: pelajar.username, type: "PELAJAR" },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const dataLogin = {
      token: token,
      pelajar: { id: pelajar.id, nama: pelajar.nama }
    };

    return response(200, dataLogin, "Login Berhasil", res);

  } catch (error) {
    return response(500, null, `Terjadi kesalahan server: ${error.message}`, res);
  }
};

module.exports = { 
  loginAdmin,
  loginPelajar
 };