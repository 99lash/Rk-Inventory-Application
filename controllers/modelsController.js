const Models = require('../models/modelsModel');

const getModels = async (req, res, next) => {
  try {
    const response = (await Models.retrieveAll()).sort((a, b) => new Date(b.id) - new Date(a.id));
    // console.log(response);
    res.render('index', {
      windowTitle: 'Models | RK Inventory',
      documentTitle: 'Royal Kludge Inventory',
      header: {
        icons: {
          hamburger: '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f5f5"> <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/> </svg>',
          close: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>',
        }
      },
      content: {
        name: 'model',
        data: response
      }
    });
  } catch (error) {
    next(error);
  }
}

const renderCreatePage = async (req, res, next) => {
  try {
    res.render('index', {
      windowTitle: 'New Model | RK Inventory',
      documentTitle: 'Royal Kludge Inventory',
      header: {
        icons: {
          hamburger: '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f5f5"> <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/> </svg>',
          close: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>',
        }
      },
      content: {
        name: 'newModel'
      }
    });
  } catch (error) {
    next(error);
  }
}

const getModelById = async (req, res, next) => {
  try {
    const { auth } = req.query;
    if (auth !== process.env.SECRET_PASSWORD) {
      return res.status(401).send('Unauthorized: Invalid password');
    }
    const { id } = req.params;
    const { model } = await Models.retrieveModelById(id);
    // console.log(model);
    res.render('index', {
      windowTitle: 'Edit Model | RK Inventory',
      documentTitle: 'Royal Kludge Inventory',
      header: {
        icons: {
          hamburger: '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f5f5"> <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/> </svg>',
          close: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>',
        }
      },
      content: {
        name: 'editModel',
        model
      }
    });
  } catch (error) {
    next(error);
  }
}

const addModel = async (req, res, next) => {
  try {
    const newModel = { name, layout, connectivity, switch_support } = req.body;
    await Models.createModel(newModel);
    res.redirect('/models');
  } catch (error) {
    next(error);
  }
}

const updateModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatingModel = req.body;
    await Models.updateModelById(id, updatingModel);
    res.redirect('/models');
  } catch (error) {
    next(error);
  }
}

const deleteModel = async (req, res, next) => {
  try {
    const { auth } = req.body;
    if (auth !== process.env.SECRET_PASSWORD) {
      return res.status(401).send('Unauthorized: Invalid password');
    }
    const { id } = req.params;
    await Models.deleteModelById(id);
    res.redirect('/models');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getModels,
  getModelById,
  addModel,
  updateModel,
  deleteModel,
  renderCreatePage
}