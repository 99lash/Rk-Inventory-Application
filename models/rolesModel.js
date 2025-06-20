const db = require('../db/index');
const NotFoundError = require('../errors/NotFoundError');
const AlreadyExistError = require('../errors/AlreadyExistError');

const retrieveAll = async () => {
  const query = 'SELECT * FROM users_roles;'
  const { rows } = await db.query(query);
  return rows;
};

const retrieveRolesById = async (id) => {
  const roleQuery = 'SELECT * FROM users_roles where id = $1;';
  const roleResponse = await db.query(roleQuery, [id]);
  return {
    users_roles: roleResponse.rows,
    isExists: roleResponse.rowCount ? true : false
  };
};

const createRole = async (newRole) => {
  const { name } = newRole;

  /*check if role already exist in products table and inventory tables and then throw an error;*/
  const isRoleAlreadyExists = (await db.query(`SELECT * FROM users_roles WHERE name = $1;`, [name, email])).rowCount;

  if (isRoleAlreadyExists) {
    throw new AlreadyExistError('Role is already exists');
  }
  const roleQuery = 'INSERT INTO users_roles (name) VALUES($1) RETURNING *;';
  const roleResponse = await db.query(roleQuery, [name]);

  return roleResponse.rows[0];
};

const updateRoleById = async (id, updatingRole) => {
  const { name } = updatingRole;
  /* check if role doesn't exists and then throw an error */

  const { isExists } = await retrieveRolesById(id);

  if (!isExists) {
    throw new NotFoundError('Role does not exists');
  }

  const userQuery = `
    UPDATE users_roles
    SET name = $1 
    WHERE id = $2
    RETURNING *; 
  `;
  const userResponse = await db.query(userQuery, [name, id]);
  return userResponse.rows[0];
};

const deleteRoleById = async (id) => {
  // check if role doesn't exists
  const { isExists } = await retrieveRolesById(id);
  if (!isExists) {
    throw new NotFoundError('Role does not exists');
  }
  const query = 'DELETE FROM users_roles WHERE id = $1 RETURNING *;';
  const { rows } = await db.query(query, [id]);
  return rows;
};

module.exports = {
  retrieveAll,
  retrieveRolesById,
  createRole,
  updateRoleById,
  deleteRoleById
}