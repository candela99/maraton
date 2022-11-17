async function tablaPosiciones() {
    let tabla = document.getElementById("posiciones");

    let body = document.createElement('tbody');
    
    let fila = document.createElement('tr');

    let th = document.createElement('th');
    th.innerText = 'PUESTOS';
    th.colSpan= '2';
    fila.appendChild(th);
    body.appendChild(fila);

    const posiciones = await generarPosiciones();
    var nroPosicion = 1;
    for(posicion of posiciones) {
        fila = document.createElement('tr');

        let td = document.createElement('td');
        td.innerText = nroPosicion + '°: ' + posicion.nombre + ' ' + posicion.apellido;
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = `<button id= ${nroPosicion} onClick="mostrarRecorrido(id)" class="botonVerTiempos">Ver tiempos en el mapa</button>`
        fila.appendChild(td);
        body.appendChild(fila);
        nroPosicion++;
    }
    tabla.appendChild(body);
}

async function mostrarRecorrido(nro_posicion_jugador) {
    const posiciones = await generarPosiciones();
    mostrarEvolucionDeCorredor(posiciones[nro_posicion_jugador - 1].id_corredor);
}


