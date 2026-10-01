const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    if (req.url === '/'){
        res.statusCode = 200;
        res.end("VOCÊ ESTÁ NA PAGINA INICIAL")
    }
    else if (req.url === '/sobre'){
        res.statusCode = 200;
        res.end("VOCÊ ESTÁ NA PAGINA SOBRE")
    }
    else if (req.url === '/alunos'){
        res.statusCode = 200;
        res.end("LISTA  DE ALUNOS")
    }
    else if (req.url === '/contato'){
        res.statusCode = 200;
        res.end("ENTRE EM CONTATO CONOSCO")
    }
    else {
        res.statusCode = 404;
        res.end("ERROR 404")
    }
});

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
