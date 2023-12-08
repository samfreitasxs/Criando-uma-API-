// index.js
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser'); // Adicionando o body-parser para lidar com o corpo da solicitação
const filmesController = require('./src/controllers/filmesController');
const errorHandler = require('./src/middleware/errorHandler');

const server = express();

// Configuração do Swagger (mantenha o mesmo)
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Filmes API',
      version: '1.0.0',
    },
  },
  apis: ['./src/controllers/*.js'],
};
const specs = swaggerJsdoc(options);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Adicionando o body-parser para processar o corpo da solicitação
server.use(bodyParser.json());

// Rota para obter filmes
server.get('/filmes', filmesController.obterFilmes);

// Rota para adicionar um novo filme (POST)
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
 *               titulo:
 *                 type: string
 *               diretor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Filme adicionado com sucesso.
 */
server.post('/filmes', filmesController.validarCampos, filmesController.adicionarFilme);

// Middleware de tratamento de erros (mantenha o mesmo)
server.use(errorHandler);

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Servidor está funcionando na porta ${PORT}`);
});
