const gridjs = require("gridjs");
const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const { connect } = require("http2");
const app = express();

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "test"
});

app.use(cors());

app.get("/alumnos", (req, res) => {
    let consulta = "SELECT * FROM Alumnos";

    connection.query(consulta, function(err, results, fields) {
        if (results.length == 0){
            res.json({mensaje: "Usuario no existe"});
        }else{
            res.json(results);
        }
    })
})

app.listen(8082, ()=>{
    console.log("Servidor en puerto 8082...");
})

app.post('/', (req, res) => {

});

app.delete('/', (req, res) => {
    
});