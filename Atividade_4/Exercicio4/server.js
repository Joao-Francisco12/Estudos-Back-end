const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.method);
    res.end("Servidor node funcionando");
});

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});