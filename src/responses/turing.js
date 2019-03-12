class TuringError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 500;
    Error.captureStackTrace(this, this.constructor);
  }

  toString() {
    return JSON.stringify({
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    });
  }
  
}

class TuringSuccess {
  constructor(message) {
    this.name = this.constructor.name;
    this.statusCode = 200;
  }

  toString() {
    return JSON.stringify({
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    });
  }

}

module.exports = { TuringError, TuringSuccess };
