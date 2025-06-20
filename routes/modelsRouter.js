const { Router } = require('express');
const { getModels, getModelById, addModel, updateModel, deleteModel} = require('../controllers/modelsController');

const modelsRouter = Router();

/* 
  @route  GET /models
  @desc   get all models
*/
modelsRouter.get('/', getModels);

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
  @route  PUT /models/:id
  @desc   dpdate model
*/
modelsRouter.put('/:id', updateModel);

/* 
  @route  DELETE /models/:id
  @desc   delete model
*/
modelsRouter.delete('/:id', deleteModel);

module.exports = modelsRouter;