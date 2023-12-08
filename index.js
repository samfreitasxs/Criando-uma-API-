// index.js
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const filmesController = require('./src/controllers/filmesController');
const { validationResult } = require('express-validator');
const errorHandler = require('./src/middleware/errorHandler');

const server = express();

// Middleware para habilitar CORS apenas para origens confiáveis
const corsOptions = {
  origin: 'http://suaorigemconfiavel.com',
  optionsSuccessStatus: 200,
};
server.use(cors(corsOptions));

// Configuração do Swagger
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

// Rota para obter filmes
server.get('/filmes', filmesController.validarCampos, filmesController.obterFilmes);

// Middleware de tratamento de erros
server.use(errorHandler);

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Servidor está funcionando na porta ${PORT}`);
});
