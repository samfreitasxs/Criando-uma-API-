const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
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

// Adicione um array temporário para armazenar os filmes (substitua por seu método de persistência real)
const filmes = [];

// Rota para obter filmes
server.get('/filmes', (req, res) => {
  return res.json({ filmes });
});

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
server.post('/filmes', filmesController.validarCampos, (req, res) => {
  const novoFilme = req.body;
  filmes.push(novoFilme);
  return res.status(201).json({ mensagem: 'Filme adicionado com sucesso' });
});

// Middleware de tratamento de erros
server.use(errorHandler);

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Servidor está funcionando na porta ${PORT}`);
});
