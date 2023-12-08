// src/controllers/filmesController.js
const { validationResult } = require('express-validator');
const filmes = require('../data/filmes.json');

/**
 * @swagger
 * /filmes:
 *   get:
 *     summary: Retorna informações sobre todos os filmes.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna um objeto com a lista de filmes.
 */
  
const obterFilmes = (req, res) => {
  return res.json({ filmes });
};

module.exports = {
    obterFilmes,
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
