import { prismaClient } from "../database/dbConfig.js";

const userModel = {
  getAll: async () => {
    return await prismaClient.users.findMany();
  },

  getById: async (id) => {
    return await prismaClient.users.findUnique({
      where: { id: Number(id) },
    });
  },

  create: async (data) => {
    return await prismaClient.users.create({ data });
  },

  update: async (data, id) => {
    return await prismaClient.users.update({
      where: { id: Number(id) },
      data,
    });
  },

  delete: async (id) => {
    return await prismaClient.users.delete({
      where: { id: Number(id) },
    });
  },
};

export default userModel;