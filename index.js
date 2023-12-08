const express = require('express');
const server = express(); 
//Servidor recebendo express
const filmes = require ('./src/data/filmes.json');

server.get('/filmes', (req,res) => {
    return res.json({filmes})
});
//'/'toda vez que passar barra esta acessando todos os dados da API
// req: requisicao res: resposta do backend


server.listen(3333, () => {
    console.log('Servidor esta funcionando...')
});
//Listen escutar uma porta
//Testando para ver se o servidor esta funcionando .log
//Iniciar a API node index.js 
//* node index.js nome do projeto
//Colcar no arquivo package.json
// start": "nodemon ./index.js",
//yarn start executar o servidor 