const pgp = require('pg-promise')();
const { config } = require('../../config/config.js')
const nodeEnv = process.env.NODE_ENV;
const {
  DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT,
} = require('../constants');

const { username, password, host, database } = config[nodeEnv];

const db_tuni = pgp(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
const db_pond = pgp(`postgres://${username}:${password}@${host}:5432/${database}`);

module.exports = { db_tuni, db_pond };
