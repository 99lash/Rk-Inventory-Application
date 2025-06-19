const { Router } = require('express');
const { getUsers, getUserById, addUser, updateUser, deleteUser } = require('../controllers/usersController');

const usersRouter = Router();

/* 
  @route  GET /users
  @desc   get all users
*/
usersRouter.get('/', getUsers);

/* 
  @route  GET /users/:id
  @desc   get user by id
*/
usersRouter.get('/:id', getUserById);

/* 
  @route  POST /users/:id
  @desc   create new user
*/
usersRouter.post('/', addUser);

/* 
  @route  PUT /users/:id
  @desc   dpdate user
*/
usersRouter.put('/:id', updateUser);

/* 
  @route  DELETE /users/:id
  @desc   delete user by id
*/
usersRouter.delete('/:id', deleteUser);

module.exports = usersRouter;