const express = require ("express");
const app = express();
app.get('/clientes', (req, res) => {
    res.json({mensaje: `Server Express respondiendo a get con valor ${req.query}`});
})

app.listen(8082, ()=>{
    console.log("Servidor en puerto 8082...");
})