const Categories = require('../models/categoriesModel');

const getCategories = async (req, res, next) => {
  try {
    const response = await Categories.retrieveAll();
    res.render('index', {
      windowTitle: 'Categories | RK Inventory',
      documentTitle: 'Royal Kludge Inventory',
      header: {
        icons: {
          hamburger: '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f5f5"> <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/> </svg>',
          close: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>',
        }
      },
      content: {
        name: 'category',
        data: response
      }
    });
  } catch (error) {
    next(error);
  }
}

const renderCreatePage = async (req, res, next) => {
  try {
    console.log('newCategory')
    res.render('index', {
      windowTitle: 'New Category | RK Inventory',
      documentTitle: 'Royal Kludge Inventory',
      header: {
        icons: {
          hamburger: '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f5f5"> <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/> </svg>',
          close: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>',
        }
      },
      content: {
        name: 'newCategory'
      }
    });
  } catch (error) {
    next(error);
  }
}

const addCategories = async (req, res, next) => {
  try {
    const newCategory = { name, description } = req.body;
    await Categories.createCategory(newCategory);
    res.redirect('/categories');
  } catch (error) {
    next(error);
  }
}

const deleteCategories = async (req, res, next) => {
  try {
    const { auth } = req.body;
    if (auth !== process.env.SECRET_PASSWORD) {
      return res.status(401).send('Unauthorized: Invalid password');
    }
    const { id } = req.params;
    await Categories.deleteCategoryById(id);
    res.redirect('/categories');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories,
  addCategories,
  deleteCategories,
  renderCreatePage
}