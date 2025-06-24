const { Router } = require('express');
const {
  getModels,
  getModelById,
  addModel,
  updateModel,
  deleteModel,
  renderCreatePage
} = require('../controllers/modelsController');

const modelsRouter = Router();

/* 
  @route  GET /models
  @desc   get all models
*/
modelsRouter.get('/', getModels);

/* 
  @route  GET /models/new
  @desc   get create model page
*/
modelsRouter.get('/new', renderCreatePage);

/* 
  @route  GET /models/:id
  @desc   get model by id
*/
modelsRouter.get('/:id', getModelById);

/* 
  @route  POST /models/:id
  @desc   create new model
*/
modelsRouter.post('/', addModel);

/* 
  @route  PUT /models/:id/update
  @desc   dpdate model
*/
modelsRouter.put('/:id/update', updateModel);

/* 
  @route  DELETE /models/:id/delete
  @desc   delete model
*/
modelsRouter.delete('/:id/delete', deleteModel);

module.exports = modelsRouter;