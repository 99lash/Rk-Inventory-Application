const { Router } = require('express');
const { getCategories, addCategories, deleteCategories, renderCreatePage } = require('../controllers/categoriesController');

const categoriesRouter = Router();

/* 
  @route  GET /categories
  @desc   get all categories
*/
categoriesRouter.get('/', getCategories);

/* 
  @route  GET /categories/new
  @desc   render create page
*/
categoriesRouter.get('/new', renderCreatePage);
/* 
  @route  POST /categories
  @desc   create new category
*/
categoriesRouter.post('/', addCategories);

/* 
  @route  DELETE /categories/:id
  @desc   delete Category
*/
categoriesRouter.delete('/:id/delete', deleteCategories);

module.exports = categoriesRouter;