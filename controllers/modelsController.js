const Models = require('../models/modelsModel');

const getModels = async (req, res, next) => {
  try {
    const response = await Models.retrieveAll();
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const getModelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Models.retrieveModelById(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const addModel = async (req, res, next) => {
  try {
    const newProduct = { name, layout, connectivity, switch_support } = req.body;
    const response = await Models.createModel(newProduct);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const updateModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatingModel = req.body;
    const response = await Models.updateModelById(id, updatingModel);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const deleteModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Models.deleteModelById(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getModels,
  getModelById,
  addModel,
  updateModel,
  deleteModel
}