const Cacheman = require('cacheman-promise');
const config = require('./../configs/turing');

const cache = new Cacheman('turing', config.cache);

module.exports = {
  cache
};
