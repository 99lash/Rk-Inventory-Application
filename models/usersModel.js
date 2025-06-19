const db = require('../db/index');
const NotFoundError = require('../errors/NotFoundError');
const AlreadyExistError = require('../errors/AlreadyExistError');

const retrieveAll = async () => {
  const query = 'SELECT * FROM users;'
  const { rows } = await db.query(query);
  return rows;
};

const retrieveUserById = async (id) => {
  const userQuery = 'SELECT * FROM users WHERE id = $1;'
  const userResponse = await db.query(userQuery, [id]);

  const roleQuery = 'SELECT * FROM users_roles where id = $1;';
  // console.log(userResponse.rows[0].role_id);
  const roleResponse = await db.query(roleQuery, [userResponse.rows[0].role_id]);
  return {
    users: userResponse.rows,
    users_roles: roleResponse.rows,
    isExists: userResponse.rowCount && roleResponse.rowCount ? true : false
  };
};

const createUser = async (newUser) => {
  const { id, role_id, name, email, password_hash } = newUser;

  /*check if user already exist in products table and inventory tables and then throw an error;*/
  const isUserAlreadyExists = (await db.query(`
    SELECT * FROM users 
    WHERE username = $1 AND email = $2
    `, [name, email]
  )
  ).rowCount;

  if (isUserAlreadyExists) {
    throw new AlreadyExistError('User is already exists');
  }
  // console.log(newUser);
  const userQuery = 'INSERT INTO users VALUES($1, $2, $3, $4, $5) RETURNING *;';
  const userReponse = await db.query(userQuery, [id, role_id, name, email, password_hash]);

  return userReponse.rows[0];
};

const updateUserById = async (id, updatingUser) => {
  const { role_id, name, email, password_hash } = updatingUser;
  /* check if user doesn't exists and then throw an error */

  const { isExists } = await retrieveUserById(id);

  if (!isExists) {
    throw new NotFoundError('User does not exists');
  }

  const userQuery = `
    UPDATE users
    SET
      role_id = $1, 
      username = $2,
      email = $3,
      password_hash= $4
    WHERE id = $5
    RETURNING *; 
  `;
  const userResponse = await db.query(userQuery, [role_id, name, email, password_hash, id]);
  return userResponse.rows[0];
};

const deleteUserById = async (id) => {
  // check if product doesn't exists
  const { isExists } = await retrieveUserById(id);
  if (!isExists) {
    throw new NotFoundError('User does not exists');
  }
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
  const { rows } = await db.query(query, [id]);
  return rows;
};

module.exports = {
  retrieveAll,
  retrieveUserById,
  createUser,
  updateUserById,
  deleteUserById
}