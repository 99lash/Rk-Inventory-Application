const indexRouter = require('express').Router();
const renderDashboard = require('../controllers/indexController');

indexRouter.get('/', renderDashboard);

module.exports = indexRouter;
