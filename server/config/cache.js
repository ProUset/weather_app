const NodeCache = require('node-cache');
const { cacheTtl } = require('./env');

const cache = new NodeCache({ stdTTL: cacheTtl, checkperiod: 120 });

module.exports = cache;
