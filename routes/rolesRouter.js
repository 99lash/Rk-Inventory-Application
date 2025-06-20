const { Router } = require('express');
const { getRoles, getRoleById, addRole, updateRole, deleteRole } = require('../controllers/rolesController');

const rolesRouter = Router();

/* 
  @route  GET /roles
  @desc   get all roles
*/
rolesRouter.get('/', getRoles);

/* 
  @route  GET /roles/:id
  @desc   get role by id
*/
rolesRouter.get('/:id', getRoleById);

/* 
  @route  POST /roles/:id
  @desc   create new role
*/
rolesRouter.post('/', addRole);

/* 
  @route  PUT /roles/:id
  @desc   dpdate role
*/
rolesRouter.put('/:id', updateRole);

/* 
  @route  DELETE /roles/:id
  @desc   delete role by id
*/
rolesRouter.delete('/:id', deleteRole);

module.exports = rolesRouter;