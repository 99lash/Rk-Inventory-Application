class AlreadyExistError extends Error {
  constructor(message = 'Something already exists') {
    super(message);
    this.name = 'AlreadyExistError',
    this.statusCode = 400;
  }
}

module.exports = AlreadyExistError