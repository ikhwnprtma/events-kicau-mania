import Joi from 'joi'

const createBirdSchema = Joi.object({
  nama: Joi.string().max(100).required().messages({
    "string.base": "Nama burung harus berupa string",
    "string.empty": "Nama burung tidak boleh kosong",
    "string.max": "Nama burung maksimal 100 karakter",
    "any.required": "Nama burung wajib diisi",
  }),
  user_id: Joi.number().required().messages({
    "number.base": "User_id harus berupa Number",
    "number.empty": "User_id tidak boleh kosong",
    "any.required": "User_id wajib diisi",
  }),
  jenis: Joi.string().max(100).required().messages({
    "string.base": "Jenis burung harus berupa string",
    "string.empty": "Jenis burung tidak boleh kosong",
    "string.max": "Jenis burung maksimal 100 karakter",
    "any.required": "Jenis burung wajib diisi",
  }),
})

const updateBirdSchema = Joi.object({
  nama: Joi.string().max(100).optional().messages({
    "string.base": "Nama burung harus berupa string",
    "string.max": "Nama burung maksimal 100 karakter",
  }),
  user_id: Joi.number().required().messages({
    "number.base": "User_id harus berupa Number",
    "number.empty": "User_id tidak boleh kosong",
    "any.required": "User_id wajib diisi",
  }),
  jenis: Joi.string().max(100).optional().messages({
    "string.base": "Jenis burung harus berupa string",
    "string.max": "Jenis burung maksimal 100 karakter",
  }),
})

export { createBirdSchema, updateBirdSchema }