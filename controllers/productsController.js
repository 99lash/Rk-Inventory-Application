const { nanoid } = require('nanoid');
const Products = require('../models/productsModel');
const Categories = require('../models/categoriesModel');
const Models = require('../models/modelsModel');

const getProducts = async (req, res, next) => {
  try {
    const response = await Products.retrieveAll();
    res.render('index', {
      windowTitle: 'Products | RK Inventory',
      documentTitle: 'Royal Kludge Inventory',
      header: {
        icons: {
          hamburger: '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f5f5"> <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/> </svg>',
          close: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>',
        }
      },
      content: {
        name: 'product',
        data: response
      }
    });
  } catch (error) {
    next(error);
  }
}

const getProductById = async (req, res, next) => {
  try {
    const { auth } = req.query;
    if (auth !== process.env.SECRET_PASSWORD) {
      res.status(401).send('Unauthorized: Invalid password');
      return;
    }

    const { id } = req.params;
    const { product, inventory } = await Products.retrieveProductById(id);
    const models = (await Models.retrieveAll());
    const categories = (await Categories.retrieveAll());
    res.render('index', {
      windowTitle: 'Edit Product | RK Inventory',
      documentTitle: 'Royal Kludge Inventory',
      header: {
        icons: {
          hamburger: '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f5f5"> <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/> </svg>',
          close: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>',
        }
      },
      content: {
        name: 'editProduct',
        product,
        inventory,
        models,
        categories
      }
    });
  } catch (error) {
    next(error);
  }
}

const addProduct = async (req, res, next) => {
  try {
    const productInfo = { name, description, price, quantity, category_id, model_id } = req.body;
    const newProduct = {
      id: nanoid(),
      ...productInfo
    }
    await Products.createProduct(newProduct);
    res.redirect('/products');
  } catch (error) {
    next(error);
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatingProduct = req.body;
    await Products.updateProductById(id, updatingProduct);
    res.redirect('/products');
  } catch (error) {
    next(error);
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { auth } = req.query;
    if (auth !== SECRET_PASSWORD) {
      res.status(401).send('Unauthorized: Invalid password');
      return;
    }
    const { id } = req.params;
    const response = await Products.deleteProductById(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

const renderCreatePage = async (req, res, next) => {
  try {
    const models = (await Models.retrieveAll());
    const categories = (await Categories.retrieveAll());
    res.render('index', {
      windowTitle: 'New Product | RK Inventory',
      documentTitle: 'Royal Kludge Inventory',
      header: {
        icons: {
          hamburger: '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f5f5"> <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/> </svg>',
          close: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>',
        }
      },
      content: {
        name: 'newProduct',
        models,
        categories
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  renderCreatePage
}