const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();


const errorHandler = require('./middlewares/errorHandler');
const indexRouter = require('./routes/indexRouter');
const productsRouter = require('./routes/productsRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const modelsRouter = require('./routes/modelsRouter');

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

/* Routers */
app.use('/models', modelsRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/', indexRouter);


/* Handles page not found error */
app.use((req, res, next) => {
  res.status(404).render('404', {
    url: req.originalUrl
  });
});

/* Handles unexpected server error */
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Running on http://localhost:${PORT}/`);
});