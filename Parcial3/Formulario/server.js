const gridjs = require("gridjs");
const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const { connect } = require("http2");
const {jsPDF} = require("jspdf");
const app = express();
const path = require("path")

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "test"
});

app.use(cors());

app.get("/", (req, res) => {
    let consulta = "SELECT NUM_CONTROL, NOMBRE FROM Alumnos";
    connection.query(consulta, function(err, results, fields) {
        if (results.length == 0){
            res.json({mensaje: "No hay alumnos registrados"});
        }else{
            res.json(results);
        }
    })
})

app.get("/alumnos", (req, res) => {
    const id = req.query.NUM_CONTROL;

    let consulta;
    if (typeof id === undefined){
        consulta = "SELECT * FROM Alumnos";
    }else{
        consulta = `SELECT * FROM Alumnos WHERE NUM_CONTROL = ${id}`
    }
    connection.query(consulta, function(err, results, fields) {
        if (typeof(id) === undefined){
            res.json({mensaje: "Usuario no existe", status: 0});
        }else{
            res.json(results[0]);
        }
    })
})

app.post("/alumnos", (req, res) => {
    const nombre = req.query.NOMBRE;
    const apPaterno = req.query.APELLIDO_PATERNO;
    const apMaterno = req.query.APELLIDO_MATERNO;
    const promedio = req.query.PROMEDIO;
    let consulta = `INSERT INTO Alumnos(Nombre, Apellido_Paterno, Apellido_Materno, Promedio) VALUES('${nombre}', '${apPaterno}', '${apMaterno}', ${promedio})`
    connection.query(consulta, function(err, results, fields) {
        if (err){
            res.json({mensaje: "Hubo un error.", status: 0});
        }
        else{
            res.json({results, mensaje: "Se agregó el registro con éxito.", status: 1});
        }
    })
})

app.listen(8080, ()=>{
    console.log("Servidor en puerto 8080...");
})

app.put("/alumnos", (req, res) => {
    const id = req.query.ID;
    const nombre = req.query.NOMBRE;
    const apPaterno = req.query.APELLIDO_PATERNO;
    const apMaterno = req.query.APELLIDO_MATERNO;
    const promedio = req.query.PROMEDIO;
    let consulta = `UPDATE Alumnos SET Nombre = '${nombre}', Apellido_Paterno = '${apPaterno}', Apellido_Materno = '${apMaterno}', Promedio = ${promedio} WHERE NUM_CONTROL = ${id}`
    connection.query(consulta, function(err, results, fields) {
        if (err){
            res.json({mensaje: "Hubo un error" + err.message, status: 0});
        }
        else{
            res.json({results, mensaje: "Se actualizo el registro con éxito.", status: 1});
        }
    })
})

app.delete('/alumnos', (req, res) => {
    const id = req.query.ID;
    let consulta = `DELETE FROM Alumnos WHERE NUM_CONTROL = ${id}`;
    connection.query(consulta, function(err, results, fields) {
        if (err){
            res.json({mensaje: "Hubo un error" + err.message, status: 0});
        }
        else{
            res.json({results, mensaje: "Se eliminó el registro con éxito.", status: 1});
        }
    })
});

app.get("/alumnos/pdf", (req, res) => {
    let doc = new jsPDF();
    doc.setFontSize(12);
    const id = req.query.ID;
    const nombre = req.query.NOMBRE;
    const apPaterno = req.query.APELLIDO_PATERNO;
    const apMaterno = req.query.APELLIDO_MATERNO;
    const promedio = req.query.PROMEDIO;
    doc.text('Numero de control', 10, 10);
    doc.text(id, 10, 20);
    doc.text('Nombre', 10, 40);
    doc.text(nombre, 10, 50);
    doc.text('Apellido paterno', 10, 70);
    doc.text(apPaterno, 10, 80);
    doc.text('Apellido materno', 10, 100);
    doc.text(apMaterno, 10, 110);
    doc.text('Promedio', 10, 130);
    doc.text(promedio, 10, 140);
    let d = new Date();
    let archivoPDF = path.join('/opt/lampp/htdocs/pweb/Parcial3/Formulario/documentos', `consulta${d.getTime()}.pdf`);
    doc.save(archivoPDF, function (err) {
        if (err) {
            return res.sendStatus(500);
        }
        res.download(archivoPDF);
    });
    res.sendFile(archivoPDF);
})
