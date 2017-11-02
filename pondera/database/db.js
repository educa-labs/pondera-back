const pgp = require('pg-promise')();

DB_NAME = "tuniversidad_production";
DB_USER = "pguser";
DB_PASS = "tuniversidad";
DB_HOST = "192.241.172.51";
DB_PORT = "5432";

const db_tuni = pgp(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

module.exports = db_tuni;