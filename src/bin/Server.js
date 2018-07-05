'use strict' // força o JS a ser mais criterioso no desenvolvimento

const app = require('../config/App'); // Importando calsse que configura o express
const http = require('http'); // Importando o WebServer
const debug = require('debug'); // Importando biblioteca de debug

const port = normalizePort(process.env.PORT || '3000'); // Atribuindo uma porta a API
app.set('port', port); // Setando a porta no Express

const server = http.createServer(app); // Criando o WebServer

server.listen(port); // Adiciona a porta no listener do Servidor
server.on('error', onError); // Tratando o evento de erro
console.log("API rodando na porta " + port);

// Verifica, testa e retorna uma porta para executar a API
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
} // normalizePort()

// Verifica e trata erros gerados no Servidor
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;

        default:
            throw error;
    }
} // onError()