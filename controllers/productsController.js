const { nanoid } = require('nanoid');
const Products = require('../models/productsModel');

const getProducts = async (req, res, next) => {
  try {
    const response = await Products.retrieveAll();
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Products.retrieveProductById(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const addProduct = async (req, res, next) => {
  try {
    const productInfo = { name, description, price, quantiy, category_id } = req.body;
    const newProduct = {
      id: nanoid(),
      ...productInfo
    }
    const response = await Products.createProduct(newProduct);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatingProduct = req.body;
    const response = await Products.updateProductById(id, updatingProduct);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Products.deleteProductById(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
}