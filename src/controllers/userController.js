import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.getAll();
      
      return res.status(200).json({
        success: true,
        message: "Berhasil mengambil semua data user",
        data: users
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data user",
        error: error.message
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.getById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User dengan ID ${id} tidak ditemukan`
        });
      }

      return res.status(200).json({
        success: true,
        message: "Berhasil mengambil detail user",
        data: user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil detail user",
        error: error.message
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const { nama, email, password_hash, role, no_telp } = req.body;

      if (!nama || !email || !password_hash) {
        return res.status(400).json({
          success: false,
          message: "Nama, email, dan password wajib diisi!"
        });
      }

      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(password_hash, saltRound);

      const newUser = await userModel.create({
        nama,
        email,
        password_hash: hashedPassword, 
        role: role || "peserta",
        no_telp
      });

      return res.status(201).json({
        success: true,
        message: "User berhasil ditambahkan!",
        data: newUser
      });
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({
          success: false,
          message: "Email sudah terdaftar, gunakan email lain."
        });
      }

      return res.status(500).json({
        success: false,
        message: "Gagal menambahkan user",
        error: error.message
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const dataUpdate = req.body;

      const userExist = await userModel.getById(id);
      if (!userExist) {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan, gagal update."
        });
      }

      if (dataUpdate.password_hash) {
        const saltRound = 10;
        dataUpdate.password_hash = await bcrypt.hash(dataUpdate.password_hash, saltRound);
      }

      const updatedUser = await userModel.update(dataUpdate, id);

      return res.status(200).json({
        success: true,
        message: "Data user berhasil diperbarui!",
        data: updatedUser
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Gagal memperbarui data user",
        error: error.message
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const userExist = await userModel.getById(id);
      if (!userExist) {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan, gagal menghapus."
        });
      }

      await userModel.delete(id);

      return res.status(200).json({
        success: true,
        message: `User dengan ID ${id} berhasil dihapus!`
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Gagal menghapus user",
        error: error.message
      });
    }
  }
};

export default userController;