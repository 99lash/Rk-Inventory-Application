const indexRouter = require('express').Router();

indexRouter.get('/', (req, res) => {
  res.render('index' , {
    pageTitle: 'Home' 
  });
});

module.exports = indexRouter;