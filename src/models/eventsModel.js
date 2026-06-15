import { prismaClient } from "../database/dbConfig.js";

const eventModel = {
  getAll: async () => {
    return await prismaClient.events.findMany();
  },

  getById: async (id) => {
    return await prismaClient.events.findUnique({
      where: { id: Number(id) },
    });
  },

  create: async (data) => {
    return await prismaClient.events.create({ data });
  },

  update: async (data, id) => {
    return await prismaClient.events.update({
      where: { id: Number(id) },
      data,
    });
  },

  delete: async (id) => {
    return await prismaClient.events.delete({
      where: { id: Number(id) },
    });
  },
};

export default eventModel;