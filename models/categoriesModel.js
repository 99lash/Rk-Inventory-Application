const db = require('../db/index');
const AlreadyExistError = require('../errors/AlreadyExistError');
const NotFoundError = require('../errors/NotFoundError');

const retrieveAll = async () => {
  const query = 'SELECT * FROM categories;'
  const { rows } = await db.query(query);
  return rows;
};

const retrieveCategoryById = async (id) => {
  const categoryQuery = 'SELECT * FROM categories WHERE id = $1;'
  const categoryResponse = await db.query(categoryQuery, [id]);
  return {
    category: categoryResponse.rows,
    isExists: categoryResponse.rowCount ? true : false
  };
};

const createCategory = async (newCategory) => {
  const { name, description } = newCategory;

  /*check if category already exist in categories table and then throw an error;*/
  const isCategoryAlreadyExists = (await db.query(`
    SELECT * FROM categories 
    WHERE name = $1 AND description = $2;
    `, [name, description]
  )
  ).rowCount;

  if (isCategoryAlreadyExists) {
    throw new AlreadyExistError('Category already exists.');
  }

  const categoryQuery = 'INSERT INTO categories (name, description) VALUES($1, $2) RETURNING *;';
  const categoryResponse = await db.query(categoryQuery, [name, description]);

  return {
    category: categoryResponse.rows[0],
  };
};

const deleteCategoryById = async (id) => {
  // check if category doesn't exists and then throw an error
  const { isExists } = await retrieveCategoryById(id);

  if (!isExists) {
    throw new NotFoundError('Category does not exists');
  }
  const query = 'DELETE FROM categories  WHERE id = $1 RETURNING *;';
  const { rows } = await db.query(query, [id]);
  return rows;
};

module.exports = {
  retrieveAll,
  createCategory,
  deleteCategoryById
}