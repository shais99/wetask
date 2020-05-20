var config;

config = require('./prod')
// if (process.env.NODE_ENV === 'production') config = require('./prod')
// else config = require('./dev')

module.exports = config