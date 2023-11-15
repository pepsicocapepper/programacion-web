const http = require ("node:http");

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin");
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        mensaje: "hola profe",
    }));
})

server.listen(8000, () => {
    console.log("Servidor Node Http corriendo en puerto 8000.");
});