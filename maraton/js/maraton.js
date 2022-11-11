/*Devuelve tracks = {[0] id = 42, [1] id = 80}*/
function obtenerCircuitos() {
    let circuitos = fetch('https://fasterthanall.herokuapp.com/api/tracks/')
        .then(resp => resp.json())
        .then(data => console.log(data))
}



/*Obtiene las posiciones de los jugadores en la carrera*/
function obtenerPosicionesDelCircuito(id_circuito) {
    let posicionesCircuito = fetch('https://fasterthanall.herokuapp.com/api/replays/' + id_circuito)
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(e => console.log(new Error(e)))
}

/*Me devuelve ID (id), Nombre (name), Apellido (surname) y Sponsor (sponsor)*/
function obtenerCorredor(id_circuito, id_corredor) {
    let corredor = fetch('https://fasterthanall.herokuapp.com/api/tracks/' + id_circuito + '/runners/' + id_corredor)
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(e => console.log(new Error(e)))

}
/*Devuelve positions={checkpoints (lista de objetos) = {coordinate (lon, lat), runner_id, timeStamp}, runner_id}*/
function obtenerPosicionesDeCorredor(id_circuito, id_corredor) {
    let posicionesCorredor = fetch('https://fasterthanall.herokuapp.com/api/replays/' + id_circuito + '/runner/' + id_corredor)
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(e => console.log(new Error(e)))
}

/*Me devuelve lista de corredores (!MUESTRA SIEMPRE EL MISMO CIRCUITO, NO IMPORTA EL ID!)*/
function obtenerCorredoresDelCircuito(id_circuito) {
    let corredores = fetch('https://fasterthanall.herokuapp.com/api/tracks/' + id_circuito + '/runners/')
        .then(res => res.json())
        .then(corredores => corredores.runners)
        .then(corr => console.log(corr))
        .catch(e => console.log(new Error(e)))
}
//obtenerCorredoresDelCircuito(42);

function generarTablaParticipantes() {
    // Obtener la referencia del elemento body
    var body = document.getElementById("tabla");

    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    let corredores = fetch('https://fasterthanall.herokuapp.com/api/tracks/' + 42 + '/runners/')
        .then(res => res.json())
        .then(corredores => corredores.runners)
        .then(corr => {
            // Crea las celdas
                var hilera0 = document.createElement("tr");

                var celda00 = document.createElement("td");
                celda00.appendChild(document.createTextNode("Nombre"))
                var celda01 = document.createElement("td");
                celda01.appendChild(document.createTextNode("Apellido"))
                var celda02 = document.createElement("td");
                celda02.appendChild(document.createTextNode("Sponsor"))
                hilera0.appendChild(celda00);
                hilera0.appendChild(celda01);
                hilera0.appendChild(celda02);

                tblBody.appendChild(hilera0);
                
            for (var i = 0; i < 4; i++) {
                // Crea las hileras de la tabla
                var hilera = document.createElement("tr");
                
                // Crea un elemento <td> y un nodo de texto, hace que el nodo de
                // texto sea el contenido de <td>, ubica el elemento <td> al final
                // de la hilera de la tabla
                var celda1 = document.createElement("td");
                var textoCelda1 = document.createTextNode(corr[i].name);
                celda1.appendChild(textoCelda1);
                hilera.appendChild(celda1);

                var celda2 = document.createElement("td");
                var textoCelda2 = document.createTextNode(corr[i].surname);
                celda2.appendChild(textoCelda2);
                hilera.appendChild(celda2);

                var celda3 = document.createElement("td");
                var textoCelda3 = document.createTextNode(corr[i].sponsor.name);
                celda3.appendChild(textoCelda3);
                hilera.appendChild(celda3);

                // agrega la hilera al final de la tabla (al final del elemento tblbody)
                tblBody.appendChild(hilera);
            }

            // posiciona el <tbody> abajo del elemento <table>
            tabla.appendChild(tblBody);
            // appends <table> into <body>
            body.appendChild(tabla);
            // modifica el atributo "border" de la tabla y lo fija a "2";
            tabla.setAttribute("border", "2");
        })
        .catch(e => console.log(new Error(e)))


}
