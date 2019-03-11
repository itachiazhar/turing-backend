const TuringError = require('./turing');

class RouteNotFoundError extends TuringError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ResourceNotFoundError extends TuringError {
  constructor(message) {
    super(message);
    this.status = 1404;
  }
}

module.exports = {
  RouteNotFoundError,
  ResourceNotFoundError
};
