const { Router } = require('express');
const { 
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  renderCreatePage
} = require('../controllers/productsController');

const productsRouter = Router();

/* 
  @route  GET /products
  @desc   get all products
*/
productsRouter.get('/', getProducts);


/* 
  @route  GET /products/new
  @desc   get create product page
*/
productsRouter.get('/new', renderCreatePage);

/* 
  @route  GET /products/:id
  @desc   get product by id
*/
productsRouter.get('/:id', getProductById);

/* 
  @route  POST /products/:id
  @desc   create new product
*/
productsRouter.post('/', addProduct);

/* 
  @route  PUT /products/:id
  @desc   dpdate product
*/
productsRouter.put('/:id', updateProduct);

/* 
  @route  DELETE /products/:id
  @desc   delete product
*/
productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter;