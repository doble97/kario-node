const config = require('../config');
const mariadb = require('mariadb');

const pool = mariadb.createPool({host: config.DB_HOST, user: config.DB_USER, password: config.DB_PASSWORD, database: config.DB_DATABASE})
module.exports = pool