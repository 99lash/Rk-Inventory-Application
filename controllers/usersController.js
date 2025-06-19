const { nanoid } = require('nanoid');
const Users = require('../models/usersModel');

const getUsers = async (req, res, next) => {
  try {
    const response = await Users.retrieveAll();
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Users.retrieveUserById(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const addUser = async (req, res, next) => {
  try {
    const userInfo = { name, description, price, quantiy, category_id } = req.body;
    const newUser = {
      id: nanoid(),
      ...userInfo
    }
    const response = await Users.createUser(newUser);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatingUser = req.body;
    const response = await Users.updateUserById(id, updatingUser);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Users.deleteUserById(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
}