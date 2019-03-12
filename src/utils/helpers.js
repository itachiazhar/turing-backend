const { validationResult } = require('express-validator/check');
const { InputValidationError } = require('../responses/index');

class Helper {

  static inputValidationHelper (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new InputValidationError('Invalid input provided'));
    }
    return next();
  }

}

module.exports = Helper;
