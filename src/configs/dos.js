const { DenialOfServiceError } = require('../responses/index');
const dosError = new DenialOfServiceError();
module.exports = {
  maxcount: 30,
  burst: 5,
  limit: 5 * 4,
  maxexpiry: 120,
  checkinterval: 1,
  trustProxy: true,
  includeUserAgent: true,
  whitelist: [],
  errormessage: dosError.toString(),
  testmode: false,
  responseStatus: 429,
};
