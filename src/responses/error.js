const { TuringError } = require('./turing');

class JwtTokenNotFoundError extends TuringError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class InvalidJwtTokenError extends TuringError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class BadRequestError extends TuringError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class DenialOfServiceError extends TuringError {
  constructor() {
    super('Too many requests');
    this.statusCode = 429;
  }
}

class RouteNotFoundError extends TuringError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ResourceNotFoundError extends TuringError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ResourceExistsError extends TuringError {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class InputValidationError extends TuringError {
  constructor(message, data) {
    super(message);
    this.statusCode = 406;
    this.data = data;
  }
}

module.exports = {
  JwtTokenNotFoundError,
  InvalidJwtTokenError,
  DenialOfServiceError,
  RouteNotFoundError,
  ResourceNotFoundError,
  InputValidationError,
  ResourceExistsError,
  BadRequestError
};
