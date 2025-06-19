const { Router } = require('express');
const { getCategories, addCategories, deleteCategories } = require('../controllers/categoriesController');

const categoriesRouter = Router();

/* 
  @route  GET /categories
  @desc   get all categories
*/

categoriesRouter.get('/', getCategories);

/* 
  @route  POST /categories
  @desc   create new category
*/
categoriesRouter.post('/', addCategories);

/* 
  @route  DELETE /categories/:id
  @desc   delete Category
*/
categoriesRouter.delete('/:id', deleteCategories);

module.exports = categoriesRouter;