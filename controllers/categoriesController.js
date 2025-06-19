const Categories = require('../models/categoriesModel');

const getCategories = async (req, res, next) => {
  try {
    const response = await Categories.retrieveAll();
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const addCategories = async (req, res, next) => {
  try {
    const newCategory = { name, description } = req.body;
    const response = await Categories.createCategory(newCategory);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const deleteCategories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Categories.deleteCategoryById(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories,
  addCategories,
  deleteCategories
}