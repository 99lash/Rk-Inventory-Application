const db = require('../db/index');
const NotFoundError = require('../errors/NotFoundError');
const AlreadyExistError = require('../errors/AlreadyExistError');

const retrieveAll = async () => {
  const query = 'SELECT * FROM products;'
  const { rows } = await db.query(query);
  return rows;
};

const retrieveProductById = async (id) => {
  const productQuery = 'SELECT * FROM products WHERE id = $1;'
  const inventoryQuery = 'SELECT * FROM inventory where product_id = $1;';
  const productResponse = await db.query(productQuery, [id]);
  const inventoryResponse = await db.query(inventoryQuery, [id]);
  return {
    product: productResponse.rows,
    inventory: inventoryResponse.rows,
    isExists: productResponse.rowCount && inventoryResponse.rowCount ? true : false
  };

};

const createProduct = async (newProduct) => {
  const { id, name, description, price, quantity = 1, category_id, model_id } = newProduct;

  /*check if product already exist in products table and inventory tables and then throw an error;*/
  const isProductAlreadyExists = (await db.query(`
    SELECT * FROM products 
    WHERE 
      name = $1 AND 
      description = $2 AND
      category_id = $3 AND
      model_id IS NOT DISTINCT FROM $4;
    `, [name, description, category_id, model_id]
  )
  ).rowCount;

  if (isProductAlreadyExists) {
    throw new AlreadyExistError('Product is already exists in the inventory');
  }

  const productQuery = 'INSERT INTO products VALUES($1, $2, $3, $4, $5, $6) RETURNING *;';
  const productResponse = await db.query(productQuery, [id, name, description, price, category_id, model_id]);

  const inventoryQuery = 'INSERT INTO inventory (product_id, quantity) VALUES($1, $2) RETURNING *;';
  const inventoryResponse = await db.query(inventoryQuery, [id, quantity]);
  return {
    product: productResponse.rows[0],
    inventory: inventoryResponse.rows[0]
  };
};

const updateProductById = async (id, updatingProduct) => {
  const { name, description, price, quantity, category_id, model_id } = updatingProduct;
  /* check if product doesn't exists and then throw an error */

  // const isProductAlreadyExists = (await db.query('SELECT * FROM products WHERE id = $1 ', [id])).rowCount && (await db.query('SELECT * FROM inventory WHERE product_id = $1', [id]));

  const { isExists } = await retrieveProductById(id);

  if (!isExists) {
    throw new NotFoundError('Product does not exists');
  }
  const productQuery = `
    UPDATE products
    SET 
      name = $1,
      description = $2,
      price = $3,
      category_id = $4,
      model_id = $5
    WHERE id = $6
    RETURNING *; 
  `;
  const productResponse = await db.query(productQuery, [name, description, price, category_id, model_id, id]);
  const inventoryQuery = `
    UPDATE inventory
    SET quantity = $1
    WHERE product_id = $2
    RETURNING *;
  `;
  const inventoryResponse = await db.query(inventoryQuery, [quantity, id]);
  return {
    product: productResponse.rows[0],
    inventory: inventoryResponse.rows[0]
  };
};

const deleteProductById = async (id) => {
  // check if product doesn't exists
  const { isExists } = await retrieveProductById(id);
  if (!isExists) {
    throw new NotFoundError('Product does not exists');
  }
  const query = 'DELETE FROM products WHERE id = $1 RETURNING *;';
  const { rows } = await db.query(query, [id]);
  return rows;
};

module.exports = {
  retrieveAll,
  retrieveProductById,
  createProduct,
  updateProductById,
  deleteProductById
}