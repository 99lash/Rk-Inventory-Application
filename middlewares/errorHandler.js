
const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error('ERROR:', err);

  res.status(statusCode);

  if (req.accepts('html')) {
    return res.render('500', {
      message,
      stack: isProd ? null : err.stack,
    });
  }

  return res.json({
    error: true,
    name: err.name || 'Error',
    message,
    ...(isProd ? {} : { stack: err.stack }),
  });
};

module.exports = errorHandler;
