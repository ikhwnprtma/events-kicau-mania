import Joi from 'joi'

const createEventSchema = Joi.object({
  nama: Joi.string().max(200).required().messages({
    "string.base": "Nama event harus berupa string",
    "string.empty": "Nama event tidak boleh kosong",
    "string.max": "Nama event maksimal 200 karakter",
    "any.required": "Nama event wajib diisi",
  }),
  tanggal: Joi.date().required().messages({
    "date.base": "Tanggal harus berupa tanggal yang valid",
    "any.required": "Tanggal event wajib diisi",
  }),
  lokasi: Joi.string().max(200).required().messages({
    "string.base": "Lokasi harus berupa string",
    "string.empty": "Lokasi tidak boleh kosong",
    "string.max": "Lokasi maksimal 200 karakter",
    "any.required": "Lokasi event wajib diisi",
  }),
  biaya: Joi.number().required().messages({
    "number.base": "Biaya harus berupa angka",
    "any.required": "Biaya event wajib diisi",
  }),
})

const updateEventSchema = Joi.object({
  nama: Joi.string().max(200).optional().messages({
    "string.base": "Nama event harus berupa string",
    "string.max": "Nama event maksimal 200 karakter",
  }),
  tanggal: Joi.date().optional().messages({
    "date.base": "Tanggal harus berupa tanggal yang valid",
  }),
  lokasi: Joi.string().max(200).optional().messages({
    "string.base": "Lokasi harus berupa string",
    "string.max": "Lokasi maksimal 200 karakter",
  }),
  biaya: Joi.number().optional().messages({
    "number.base": "Biaya harus berupa angka",
  }),
})

export { createEventSchema, updateEventSchema }