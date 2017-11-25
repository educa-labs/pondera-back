const config = {
  development: {
    username: 'pondera_admin',
    password: '123456',
    database: 'pondera_development',
    host: '127.0.0.1',
    dialect: 'postgres',
    'migrations-path': '.src/database/migrations',
    'models-path': '.src/models',
    'seeders-path': '.src/database/seeders',
  },
  test: {
    username: null,
    password: null,
    database: 'pondera_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    'migrations-path': '.src/database/migrations',
    'models-path': '.src/models',
    'seeders-path': '.src/database/seeders',
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOSTNAME,
    dialect: 'postgres',
    'migrations-path': '.src/database/migrations',
    'models-path': '.src/models',
    'seeders-path': '.src/database/seeders',
  },
};

module.exports = { config };
