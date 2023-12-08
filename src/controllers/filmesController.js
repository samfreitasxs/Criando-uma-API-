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

/**
 * @swagger
 * /filmes:
 *   post:
 *     summary: Adiciona um novo filme.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               nome:
 *                 type: string
 *               foto:
 *                 type: string
 *               descricao:
 *                  type: string
 *               elenco:
 *                  type: string
 *     responses:
 *       201:
 *         description: Filme adicionado com sucesso.
 */
const adicionarFilme = (req, res) => {
  const { titulo, diretor } = req.body;

  // Adicione a lógica para adicionar o filme à sua fonte de dados (por exemplo, um banco de dados)
  // Por enquanto, apenas simularemos que o filme foi adicionado à lista existente
  filmes.push({ titulo, diretor });

  return res.status(201).json({ mensagem: 'Filme adicionado com sucesso' });
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
  adicionarFilme,
  validarCampos,
};
