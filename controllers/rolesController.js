const { nanoid } = require('nanoid');
const Roles = require('../models/rolesModel');

const getRoles = async (req, res, next) => {
  try {
    const response = await Roles.retrieveAll();
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const getRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Roles.retrieveRolesById(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const addRole = async (req, res, next) => {
  try {
    const response = await Roles.createRole(req.body);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatingUser = req.body;
    const response = await Roles.updateRoleById(id, updatingUser);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Roles.deleteRoleById(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRoles,
  getRoleById,
  addRole,
  updateRole,
  deleteRole
}