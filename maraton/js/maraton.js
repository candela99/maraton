async function tablaPosiciones() {
    let tabla = document.getElementById("posiciones");

    let body = document.createElement('tbody');
    
    const posiciones = await generarPosiciones();
    console.log(posiciones);
    var nroPosicion = 1;
    for(posicion of posiciones) {
        let fila = document.createElement('tr');

        let td = document.createElement('td');
        td.innerText = nroPosicion + '°: ' + posicion.nombre + ' ' + posicion.apellido;
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = `<button onClick="mostrarEvolucionDeCorredor(posicion.id_corredor)">Ver tiempos en el mapa</button>`
        fila.appendChild(td);

        body.appendChild(fila);
        nroPosicion++;
    }
    tabla.appendChild(body);
}





function tablaTiempos(){

    var body = document.getElementById("tablaTiempos");

    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Crea las celdas
    var hilera0 = document.createElement("tr");
    var posta1 = document.createElement("tr");
    var posta2 = document.createElement("tr");
    var posta3 = document.createElement("tr");
    var posta4 = document.createElement("tr");
    var posta5 = document.createElement("tr");
    var posta6 = document.createElement("tr");

    tblBody.appendChild(hilera0);

    let i = 0;
    let corredores = fetch('https://fasterthanall.herokuapp.com/api/tracks/42/runners/')
        .then(res => res.json())
        .then(corredores => {
            for(corredor of corredores.runners){
                fetch('https://fasterthanall.herokuapp.com/api/replays/42/runner/' + corredor.id)
                .then(resp => resp.json())
                .then(corr => {
                    var celda01 = document.createElement("td");
                    celda01.appendChild(document.createTextNode("id_corredor:" + corr.positions.runner_id))
                    hilera0.appendChild(celda01);   
                    console.log(corr);

                    var celda2 = document.createElement("td");
                    celda2.appendChild(document.createTextNode(corr.positions.checkpoints[0].timeStamp))
                    posta1.appendChild(celda2);

                    var celda3 = document.createElement("td");
                    celda3.appendChild(document.createTextNode(corr.positions.checkpoints[1].timeStamp))
                    posta2.appendChild(celda3);

                    var celda4 = document.createElement("td");
                    celda4.appendChild(document.createTextNode(corr.positions.checkpoints[2].timeStamp))
                    posta3.appendChild(celda4);

                    var celda5 = document.createElement("td");
                    celda5.appendChild(document.createTextNode(corr.positions.checkpoints[3].timeStamp))
                    posta4.appendChild(celda5);

                    var celda6 = document.createElement("td");
                    celda6.appendChild(document.createTextNode(corr.positions.checkpoints[4].timeStamp))
                    posta5.appendChild(celda6);

                    var celda7 = document.createElement("td");
                    celda7.appendChild(document.createTextNode(corr.positions.checkpoints[5].timeStamp))
                    posta6.appendChild(celda7);
                    console.log(corr)
                })
                i++;
                tblBody.appendChild(posta1);
                tblBody.appendChild(posta2);
                tblBody.appendChild(posta3);
                tblBody.appendChild(posta4);
                tblBody.appendChild(posta5);
                tblBody.appendChild(posta6);
            }
            
            // posiciona el <tbody> abajo del elemento <table>
            tabla.appendChild(tblBody);
            // appends <table> into <body>
            body.appendChild(tabla);
            // modifica el atributo "border" de la tabla y lo fija a "2";
            tabla.setAttribute("border", "2");
    })   
}


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
