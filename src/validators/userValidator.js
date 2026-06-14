import Joi from "joi";

const userValidator = {
  // Langsung definisikan skemanya sebagai objek Joi murni
  createValidation: Joi.object({
    nama: Joi.string().max(100).required().messages({
      'string.empty': 'Nama tidak boleh kosong',
      'any.required': 'Nama wajib diisi'
    }),

    email: Joi.string().email().max(150).required().messages({
      'string.email': 'Format email tidak valid',
      'string.empty': 'Email tidak boleh kosong',
      'any.required': 'Email wajib diisi'
    }),

    password_hash: Joi.string().required().messages({
      'string.empty': 'Password tidak boleh kosong',
      'any.required': 'Password wajib diisi'
    }),

    role: Joi.string().valid('peserta', 'admin').default('peserta').messages({
      'any.only': 'Role harus berupa peserta atau admin'
    }),

    no_telp: Joi.string().max(20).allow(null, '').messages({
      'string.max': 'Nomor telepon maksimal 20 karakter'
    })
  }), 

  updateValidation: Joi.object({
    nama: Joi.string().max(100),
    email: Joi.string().email().max(150),
    password_hash: Joi.string(),
    role: Joi.string().valid('peserta', 'admin'),
    no_telp: Joi.string().max(20).allow(null, '')
  }).min(1).messages({
    'object.min': 'Minimal harus ada satu data yang dikirim untuk diupdate'
  })
};

export default userValidator;