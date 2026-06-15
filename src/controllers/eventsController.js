import eventModel from "../models/eventsModel.js";

const getAll = async (req, res, next) => {
  try {
    const events = await eventModel.getAll();
    if (!events || events.length === 0)
      return res.status(404).json({ error: "Data tidak ditemukan" });
    return res.status(200).json({
      status: true,
      message: "berhasil",
      data: events,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventModel.getById(id);
    if (!event)
      return res.status(404).json({ error: "Data tidak ditemukan" });
    return res.status(200).json({
      status: true,
      message: "berhasil",
      data: event,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;

    const newEvent = await eventModel.create(data);
    return res.status(201).json({
      status: true,
      message: "berhasil",
      data: newEvent,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const event = await eventModel.getById(id);
    if (!event)
      return res.status(404).json({ error: "Data tidak ditemukan" });

    const updatedEvent = await eventModel.update(data, id);
    return res.status(200).json({
      status: true,
      message: "berhasil",
      data: updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventModel.getById(id);
    if (!event)
      return res.status(404).json({ error: "Data tidak ditemukan" });

    await eventModel.delete(id);
    return res.status(200).json({
      status: true,
      message: "berhasil dihapus",
      data: event,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { getAll, getById, create, update, destroy };