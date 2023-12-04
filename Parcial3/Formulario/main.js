

window.onload = function () {
    //? Traer los ID y titulos de los alumnos
    new gridjs.Grid({
        search: true,
        pagination: true,
        fixedHeader: true,
        sort: true,
        height: '200px',
        width: '1200px',
        pagination: {
            limit: 50
        },
        columns: ['Numero de control', 'Nombre'],
        server: {
            url: 'http://localhost:8080',
            then: data => data.map(alumno =>
                [alumno.NUM_CONTROL, alumno.NOMBRE]
            )
        }
    }).render(document.getElementById("tabla"));

    //? Boton para consultar un elemento especifico
    document.getElementById("btnConsultar").addEventListener("click", async () => {
        let id = document.getElementById("inputID").value;
        let response = await fetch(`http://localhost:8080/alumnos?NUM_CONTROL=${id}`, { method: "GET" });
        let data = await response.json();
        console.log(data)
        if (data.status == 0) {
            alert(data)
        }
        else {
            alert(data.NOMBRE);
            console.log(data.datos);
            console.log(data.status);
            document.getElementById("nombre").value = data.NOMBRE;
            document.getElementById("apellido_paterno").value = data.APELLIDO_PATERNO;
            document.getElementById("apellido_materno").value = data.APELLIDO_MATERNO;
            document.getElementById("promedio").value = data.PROMEDIO;
        }
    });

    //? Boton para agregar un nuevo elemento
    document.getElementById("btnAgregar").addEventListener("click", async () => {
        let vNombre = document.getElementById("nombre").value;
        let vApPaterno = document.getElementById("apellido_paterno").value;
        let vApMaterno = document.getElementById("apellido_materno").value;
        let vPromedio = document.getElementById("promedio").value;
        await fetch(`http://localhost:8080/alumnos?NOMBRE=${vNombre}&APELLIDO_PATERNO=${vApPaterno}&APELLIDO_MATERNO=${vApMaterno}&PROMEDIO=${vPromedio}`, { method: "POST" })
            .then(response => response.json())
            .then(data => {
                if (data.status === 1) {
                    alert(data.mensaje);
                } else {
                    alert(data.mensaje);
                }
            })
    });

    //? Boton para modificar un elemento
    document.getElementById("btnModificar").addEventListener("click", async () => {
        let vID = document.getElementById("inputID").value;
        let vNombre = document.getElementById("nombre").value;
        let vApPaterno = document.getElementById("apellido_paterno").value;
        let vApMaterno = document.getElementById("apellido_materno").value;
        let vPromedio = document.getElementById("promedio").value;
        await fetch(`http://localhost:8080/alumnos?ID=${vID}&NOMBRE=${vNombre}&APELLIDO_PATERNO=${vApPaterno}&APELLIDO_MATERNO=${vApMaterno}&PROMEDIO=${vPromedio}`, { method: "PUT" })
        let data = await response.blob();
        let archivoPDF = URL.createObjectURL(data);
        window.open(archivoPDF);
    });

    //? Boton para eliminar un elemento especifico
    document.getElementById("btnEliminar").addEventListener("click", async () => {
        let id = document.getElementById("inputID").value;
        await fetch(`http://localhost:8080/alumnos?ID=${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => {
                if (data.status === 1) {
                    alert(data.mensaje);
                } else {
                    alert(data.mensaje);
                }
            })
    });

    //? Boton para generar un PDF de la consulta
    document.getElementById("btnPDFConsulta").addEventListener("click", async () => {
        let vID = document.getElementById("inputID").value;
        let vNombre = document.getElementById("nombre").value;
        let vApPaterno = document.getElementById("apellido_paterno").value;
        let vApMaterno = document.getElementById("apellido_materno").value;
        let vPromedio = document.getElementById("promedio").value;
        let response = await fetch(`http://localhost:8080/alumnos/pdf?ID=` + vID + `&NOMBRE=` + vNombre + `&APELLIDO_PATERNO=` + vApPaterno + `&APELLIDO_MATERNO=` + vApMaterno + `&PROMEDIO=` + vPromedio, { method: "GET" })
        .then(response => response.blob())
        .then(blob => {
            let url = window.URL.createObjectURL(blob);
            alert(url);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'a4.pdf';
            a.click();
        });
    });
};