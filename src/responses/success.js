const { TuringSuccess } = require('./turing');

class ResourceCreatedSuccess extends TuringSuccess {
  constructor(message) {
    super(message);
    this.statusCode = 200;
  }
}

module.exports = {
  ResourceCreatedSuccess,
  TuringSuccess
};
