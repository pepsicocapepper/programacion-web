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

app.get("/alumnos", (req, res) => {
    let consulta = "";

    if (typeof(req.query.idAlumno) == "undefined"){
        consulta = "SELECT * FROM Alumnos";
    }else{
        consulta = `SELECT * FROM Alumnos WHERE NUM_CONTROL = ${req.query.idAlumno}`
    }

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