import { prismaClient } from "../database/dbConfig.js";

const birdModel = {
  getAll: async () => {
    return await prismaClient.birds.findMany({
      include: { users: true },
    });
  },

  getById: async (id) => {
    return await prismaClient.birds.findUnique({
      where: { id: Number(id) },
      include: { users: true },
    });
  },

  create: async (data) => {
    return await prismaClient.birds.create({ data });
  },

  update: async (data, id) => {
    return await prismaClient.birds.update({
      where: { id: Number(id) },
      data,
    });
  },

  delete: async (id) => {
    return await prismaClient.birds.delete({
      where: { id: Number(id) },
    });
  },
};

export default birdModel;