const Products = require('../models/productsModel');
const Models = require('../models/modelsModel');
const Categories = require('../models/categoriesModel');


const renderDashboard = async (req, res) => {
  const products = ((await Products.retrieveAll()).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));
  const models = (await Models.retrieveAll());
  const categories = (await Categories.retrieveAll());
  const totalLowStock = (await Products.retrieveLowStock());
  
  // console.log(products[0])
  // console.log('----------------------------------------')
  // console.log(models[0])
  // let recentlyAdded = [];
  // for (var i = 0; i < 3; i++) {
  //   for (var k = 0; k < categories.length; k++) {
  //     if (products[i].model_id === models[k].id) {
  //       recentlyAdded[i] = {
  //         ...products[i],
  //         ...models[i]
  //       }
  //     }
  //   }
  // }
  // console.log(recentlyAdded);

  res.render('index', {
    windowTitle: 'Home | RK Inventory',
    documentTitle: 'Royal Kludge Inventory',
    header: {
      icons: {
        hamburger: '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f5f5"> <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/> </svg>',
        close: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>',
      }
    },
    content: {
      name: 'dashboard',
      data: {
        totalProducts: products.length,
        totalModels: models.length,
        totalCategories: categories.length,
        totalLowStock: totalLowStock.length,
        recentlyAdded
      },
    }
  });
}

module.exports = renderDashboard;