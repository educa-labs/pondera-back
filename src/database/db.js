const pgp = require('pg-promise')();

DB_NAME = "tuniversidad_production";
DB_USER = "pguser";
DB_PASS = "tuniversidad";
DB_HOST = "192.241.172.51";
DB_PORT = "5432";

DBP_NAME = "pondera";
DBP_USER = "educalabs";
DBP_PASS = "Callampa123123";
DBP_HOST = "pondera.cjg6fuesbuu0.us-east-2.rds.amazonaws.com";
DBP_PORT = "5432";


const db_tuni = pgp(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
const db_pond = pgp(`postgres://${DBP_USER}:${DBP_PASS}@${DBP_HOST}:${DBP_PORT}/${DBP_NAME}`);

module.exports = {"db_tuni": db_tuni, "db_pond": db_pond};