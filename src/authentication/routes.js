const express = require('express');
const handler = require('./handlers');
const Validator = require('./validators');
const Helper = require('./../utils/helpers');
let router = express.Router();

router.post('/register', Validator.register(), Helper.inputValidationHelper, handler.register);
router.post('/login', Validator.login(), Helper.inputValidationHelper, handler.login);

module.exports = router;
