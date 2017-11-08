const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


// Modulos de rutas
const users = require('./routes/users');
const ponderar = require('./routes/ponderar');
const tuni = require('./routes/tuni');
const session = require('./routes/session');

// Iniciar Aplicacion
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Usar rutas
app.use('/api/v1/users', users);
app.use('/api/v1/ponderar', ponderar);
app.use('/api/v1/tuni', tuni);
app.use('/api/v1/session', session);

module.exports = app;
