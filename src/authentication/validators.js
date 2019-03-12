const { check } = require('express-validator/check');

class AuthenticationInputValidator {

  static login () {
    return [
      check('email')
        .exists()
        .isEmail()
        .normalizeEmail(),
      check('password')
        .exists()
        .escape()
        .isLength({ min: 5, max: 50 })
        .withMessage('must be at least 5 characters long')
    ];
  }

  static register () {
    return [
      check('name')
        .exists()
        .trim()
        .escape()
        .isLength({min: 1, max: 50})
        .withMessage('must be at least 1 characters long'),
      check('email')
        .exists()
        .isEmail()
        .normalizeEmail(),
      check('password')
        .exists()
        .escape()
        .isLength({ min: 5, max: 50 })
        .withMessage('must be at least 5 characters long')
    ];
  }

}

module.exports = AuthenticationInputValidator;
