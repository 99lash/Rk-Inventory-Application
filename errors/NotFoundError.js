class NotFoundError extends Error {
  constructor(message = 'Not Found Error') {
    super(message);
    this.name ='NotFoundError';
    this.statusCode= 404;
  }
}

module.exports = NotFoundError;