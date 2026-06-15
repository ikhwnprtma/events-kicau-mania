import Joi from 'joi'

const createRegistrationSchema = Joi.object({
  user_id: Joi.number().required().messages({
      "number.base": "User_id harus berupa Number",
      "number.empty": "User_id tidak boleh kosong",
      "any.required": "User_id wajib diisi",
  }),
 event_id: Joi.number().required().messages({
      "number.base": "Event_id harus berupa Number",
      "number.empty": "Event_id tidak boleh kosong",
      "any.required": "Event_id wajib diisi",
  }),
  bird_id: Joi.number().required().messages({
      "number.base": "Bird_id harus berupa Number",
      "number.empty": "Bird_id tidak boleh kosong",
      "any.required": "Bird_id wajib diisi",
  }),
  kategori: Joi.string().max(100).required().messages({
    "string.base": "Kategori harus berupa string",
    "string.empty": "Kategori tidak boleh kosong",
    "string.max": "Kategori maksimal 100 karakter",
    "any.required": "Kategori wajib diisi",
  }),
  nomor_peserta: Joi.string().max(20).optional().allow(null, "").messages({
    "string.base": "Nomor peserta harus berupa string",
    "string.max": "Nomor peserta maksimal 20 karakter",
  }),
  status_bayar: Joi.string().max(20).required().messages({
    "string.base": "Status bayar harus berupa string",
    "string.empty": "Status bayar tidak boleh kosong",
    "string.max": "Status bayar maksimal 20 karakter",
    "any.required": "Status bayar wajib diisi",
  }),
})

const updateRegistrationSchema = Joi.object({
  user_id: Joi.number().required().messages({
      "number.base": "User_id harus berupa Number",
      "number.empty": "User_id tidak boleh kosong",
      "any.required": "User_id wajib diisi",
  }),
  event_id: Joi.number().required().messages({
      "number.base": "Event_id harus berupa Number",
      "number.empty": "Event_id tidak boleh kosong",
      "any.required": "Event_id wajib diisi",
  }),
  bird_id: Joi.number().required().messages({
      "number.base": "Bird_id harus berupa Number",
      "number.empty": "Bird_id tidak boleh kosong",
      "any.required": "Bird_id wajib diisi",
  }),
  kategori: Joi.string().max(100).optional().messages({
    "string.base": "Kategori harus berupa string",
    "string.max": "Kategori maksimal 100 karakter",
  }),
  nomor_peserta: Joi.string().max(20).optional().allow(null, "").messages({
    "string.base": "Nomor peserta harus berupa string",
    "string.max": "Nomor peserta maksimal 20 karakter",
  }),
  status_bayar: Joi.string().max(20).optional().messages({
    "string.base": "Status bayar harus berupa string",
    "string.max": "Status bayar maksimal 20 karakter",
  }),
})

export { createRegistrationSchema, updateRegistrationSchema }