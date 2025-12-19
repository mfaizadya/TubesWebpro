const esaiModel = require('../models/soalesai');
const response = require('../helpers/response');

const getAllEsai = async (req, res) => {
    try {
        const data = await esaiModel.getAllSoalEsai();
        return response(200, data, "Berhasil mengambil semua soal esai", res);
    } catch (error) {
        return response(500, null, error.message, res);
    }
};

const getEsaiById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await esaiModel.getSoalEsaiById(id);
        
        if (!data) {
            return response(404, null, "Soal esai tidak ditemukan", res);
        }
        
        return response(200, data, "Berhasil mengambil detail soal esai", res);
    } catch (error) {
        return response(500, null, error.message, res);
    }
};

const getEsaiByLevel = async (req, res) => {
    try {
        const data = await esaiModel.getSoalEsaiByLevel(req.params.id_level);
        return response(200, data, `Berhasil mengambil soal esai level ${req.params.id_level}`, res);
    } catch (error) {
        return response(500, null, error.message, res);
    }
};

const createEsai = async (req, res) => {
    try {
        const { id_level, text_soal, kata_kunci } = req.body;
        const data = await esaiModel.createSoalEsai(id_level, text_soal, kata_kunci);
        return response(201, data, "Soal esai berhasil dibuat", res);
    } catch (error) {
        return response(500, null, error.message, res);
    }
};

const updateEsai = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_level, text_soal, kata_kunci } = req.body;
        const data = await esaiModel.updateSoalEsai(id, id_level, text_soal, kata_kunci);
        return response(200, data, "Soal esai berhasil diperbarui", res);
    } catch (error) {
        return response(500, null, error.message, res);
    }
};

const deleteEsai = async (req, res) => {
    try {
        await esaiModel.deleteSoalEsai(req.params.id);
        return response(200, null, "Soal esai berhasil dihapus", res);
    } catch (error) {
        return response(500, null, error.message, res);
    }
};

module.exports = { getAllEsai, getEsaiById ,getEsaiByLevel, createEsai, updateEsai, deleteEsai };