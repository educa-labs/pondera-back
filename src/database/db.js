const pgp = require('pg-promise')();

const {
  DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT, DBP_NAME, DBP_USER, DBP_PASS, DBP_HOST, DBP_PORT,
} = require('../constants');

const db_tuni = pgp(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
const db_pond = pgp(`postgres://${DBP_USER}:${DBP_PASS}@${DBP_HOST}:${DBP_PORT}/${DBP_NAME}`);

module.exports = { db_tuni, db_pond };
