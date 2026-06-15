import { prismaClient } from "../database/dbConfig.js";
import registrationModel from "../models/registrationsModel.js";

const getAll = async (req, res, next) => {
  try {
    const registrations = await registrationModel.getAll();
    if (!registrations || registrations.length === 0)
      return res.status(404).json({ error: "Data tidak ditemukan" });
    return res.status(200).json({
      status: true,
      message: "berhasil",
      data: registrations,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const registration = await registrationModel.getById(id);
    if (!registration)
      return res.status(404).json({ error: "Data tidak ditemukan" });
    return res.status(200).json({
      status: true,
      message: "berhasil",
      data: registration,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const create = async (req, res, next) => {
  try { 
    const { user_id, event_id, bird_id, kategori, status_bayar } = req.body;
    const totalPendaftar = await prismaClient.registrations.count(); 
    const nextSequence = totalPendaftar + 1;
    const paddedSequence = String(nextSequence).padStart(4, '0');

    const currentYear = new Date().getFullYear();
  
    const nomorPesertaGenerated = `REG-${currentYear}-${paddedSequence}`;

    const newRegistration = await prismaClient.registrations.create({
          data: {
            user_id: Number(user_id),       
            event_id: Number(event_id),     
            bird_id: Number(bird_id),       
            kategori: kategori,
            nomor_peserta: nomorPesertaGenerated, 
            status_bayar: status_bayar || "belum_bayar"
          }
        });
    return res.status(201).json({
      status: true,
      message: "berhasil",
      data: newRegistration 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const registration = await registrationModel.getById(id);
    if (!registration)
      return res.status(404).json({ error: "Data tidak ditemukan" });

    const updatedRegistration = await registrationModel.update(data, id);
    return res.status(200).json({
      status: true,
      message: "berhasil",
      data: updatedRegistration,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const registration = await registrationModel.getById(id);
    if (!registration)
      return res.status(404).json({ error: "Data tidak ditemukan" });

    await registrationModel.delete(id);
    return res.status(200).json({
      status: true,
      message: "berhasil dihapus",
      data: registration,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { getAll, getById, create, update, destroy };