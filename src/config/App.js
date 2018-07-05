'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json()); // Faz o parse (converte) automático dos dados da req e/ou res
app.use(bodyParser.urlencoded({ // Codifica as URL
    extended: false
}));

// Conecta ao DB
mongoose.connect('mongodb://thiagosf-dev:Thiago.85@ds018568.mlab.com:18568/cinema-ht');

// Carrega os models
const Client = require('../models/Client');

// Carrega as rotas
const indexRouts = require('../routes/IndexRoutes');
const clientRoutes = require('../routes/ClientRoutes');

app.use('/', indexRouts);
app.use('/clients', clientRoutes);

module.exports = app;