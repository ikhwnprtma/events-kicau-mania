import { prismaClient } from "../database/dbConfig.js";

const registrationModel = {
  getAll: async () => {
    return await prismaClient.registrations.findMany({
      include: { users: true, events: true, birds: true },
    });
  },

  getById: async (id) => {
    return await prismaClient.registrations.findUnique({
      where: { id: Number(id) },
      include: { users: true, events: true, birds: true },
    });
  },

  create: async (data) => {
    return await prismaClient.registrations.create({ data });
  },

  update: async (data, id) => {
    return await prismaClient.registrations.update({
      where: { id: Number(id) },
      data,
    });
  },

  delete: async (id) => {
    return await prismaClient.registrations.delete({
      where: { id: Number(id) },
    });
  },
};

export default registrationModel;