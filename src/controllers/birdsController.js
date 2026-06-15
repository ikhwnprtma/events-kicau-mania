import birdModel from "../models/birdsModel.js";

const getAll = async (req, res, next) => {
  try {
    const birds = await birdModel.getAll();
    if (!birds || birds.length === 0)
      return res.status(404).json({ error: "Data tidak ditemukan" });
    return res.status(200).json({
      status: true,
      message: "berhasil",
      data: birds,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bird = await birdModel.getById(id);
    if (!bird)
      return res.status(404).json({ error: "Data tidak ditemukan" });
    return res.status(200).json({
      status: true,
      message: "berhasil",
      data: bird,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;

    const newBird = await birdModel.create(data);
    return res.status(201).json({
      status: true,
      message: "berhasil",
      data: newBird,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const bird = await birdModel.getById(id);
    if (!bird)
      return res.status(404).json({ error: "Data tidak ditemukan" });

    const updatedBird = await birdModel.update(data, id);
    return res.status(200).json({
      status: true,
      message: "berhasil",
      data: updatedBird,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bird = await birdModel.getById(id);
    if (!bird)
      return res.status(404).json({ error: "Data tidak ditemukan" });

    await birdModel.delete(id);
    return res.status(200).json({
      status: true,
      message: "berhasil dihapus",
      data: bird,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { getAll, getById, create, update, destroy };