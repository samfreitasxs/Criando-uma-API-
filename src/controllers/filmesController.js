// src/controllers/filmesController.js
const { validationResult } = require('express-validator');
const filmes = require('../data/filmes.json');

const obterFilmes = (req, res) => {
  return res.json({ filmes });
};

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  obterFilmes,
  validarCampos,
};
