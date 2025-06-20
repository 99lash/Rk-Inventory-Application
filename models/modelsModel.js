const db = require('../db/index');
const NotFoundError = require('../errors/NotFoundError');
const AlreadyExistError = require('../errors/AlreadyExistError');

const retrieveAll = async () => {
  const query = 'SELECT * FROM models;'
  const { rows } = await db.query(query);
  return rows;
};

const retrieveModelById = async (id) => {
  const modelQuery = 'SELECT * FROM models WHERE id = $1;'
  const modelResponse = await db.query(modelQuery, [id]);
  return {
    model: modelResponse.rows,
    isExists: modelResponse.rowCount ? true : false
  };

};

const createModel = async (newModel) => {
  const { name, layout, connectivity, switch_support } = newModel;

  /*check if model already exist in products table and inventory tables and then throw an error;*/
  const isModelAlreadyExists = (await db.query(`
    SELECT * FROM models 
    WHERE 
      name = $1 AND 
      layout = $2 AND
      connectivity = $3 AND
      switch_support = $4;
    `, [name, layout, connectivity, switch_support]
  )
  ).rowCount;

  if (isModelAlreadyExists) {
    throw new AlreadyExistError('Model is already exists in the inventory');
  }

  const modelQuery = 'INSERT INTO models (name, layout, connectivity, switch_support) VALUES($1, $2, $3, $4) RETURNING *;';
  const modelResponse = await db.query(modelQuery, [name, layout, connectivity, switch_support]);
  return modelResponse.rows[0];
};

const updateModelById = async (id, updatingModel) => {
  const { name, layout, connectivity, switch_support} = updatingModel;

  /* check if model doesn't exists and then throw an error */
  const { isExists } = await retrieveModelById(id);
  if (!isExists) {
    throw new NotFoundError('Model does not exists');
  }
  const modelQuery = `
    UPDATE models
    SET 
      name = $1,
      layout = $2,
      connectivity = $3,
      switch_support = $4
    WHERE id = $5
    RETURNING *; 
  `;
  const modelResponse = await db.query(modelQuery, [name, layout, connectivity, switch_support, id]);
  return modelResponse.rows[0];
};

const deleteModelById = async (id) => {
  // check if model doesn't exists
  const { isExists } = await retrieveModelById(id);
  if (!isExists) {
    throw new NotFoundError('Model does not exists');
  }
  const query = 'DELETE FROM models WHERE id = $1 RETURNING *;';
  const { rows } = await db.query(query, [id]);
  return rows;
};

module.exports = {
  retrieveAll,
  retrieveModelById,
  createModel,
  updateModelById,
  deleteModelById
}