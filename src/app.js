const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const mailer = require('express-mailer');


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
const admin = require('./routes/admin');

// Iniciar Aplicacion
const app = express();

mailer.extend(app, {
  from: 'no-reply@educalabs.cl',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  }
});

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// Use CORS
const whitelist = ['http://localhost', 'https://beta.pondera.cl', 'https://www.pondera.cl'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
if (false && process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptions));
} else {
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
app.use('/api/v1/admin', admin);

module.exports = app;
