const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const ENV = process.env.ENV || 'development';

if (ENV === 'development') {
  dotenv.config({ path: 'development.env' });
} else if (ENV === 'production') {
  dotenv.config({ path: 'production.env' });
}

// Modulos de rutas
const users = require('./routes/users');
const ponderar = require('./routes/ponderar');
const tuni = require('./routes/tuni');
const session = require('./routes/session');
const regions = require('./routes/regions');

// Iniciar Aplicacion
const app = express();

// Use CORS
const whitelist = ['localhost', 'https://beta.pondera.cl', 'https://www.pondera.cl'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
if (process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptions));
}
else {
  app.use(cors());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Usar rutas
app.use('/api/v1/users', users);
app.use('/api/v1/ponderar', ponderar);
app.use('/api/v1/tuni', tuni);
app.use('/api/v1/session', session);
app.use('/api/v1/regions', regions);

module.exports = app;
