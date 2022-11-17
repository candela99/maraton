let map = L.map('map').setView([-34.522832, -58.700531], 16) //coordenadas de la UNGS


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let map2 = L.map('map2').setView([-34.522832, -58.700531], 13) //coordenadas de la UNGS

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2);

L.marker([-34.541941473196005, -58.71009050056615], { draggable: false }).addTo(map2)
    .bindPopup('<b>Centro de salud N°1</b><br>Direccion 0001<br><i>Horario: 8-13</i>');

L.marker([-34.54240006289364, -58.71129542632785], { draggable: false }).addTo(map2)
    .bindPopup('<b>Centro de salud N°2</b><br>Direccion 0002<br><i>Horario: 8-13</i>');

L.marker([-34.5386154585882, -58.70007194211304], { draggable: false }).addTo(map2)
    .bindPopup('<b>Centro de salud N°3</b><br>Direccion 0003<br><i>Horario: 8-13</i>');

L.marker([-34.57033889693274, -58.72710821406872], { draggable: false }).addTo(map2)
    .bindPopup('<b>Centro de salud N°4</b><br>Direccion 0004<br><i>Horario: 8-13</i>');

L.marker([-34.542462516578325, -58.73393781731669], { draggable: false }).addTo(map2)
    .bindPopup('<b>Centro de salud N°5</b><br>Direccion 0005<br><i>Horario: 8-13</i>');

function dibujarCircuito(id_circuito) {
    var coordenadasArr = [];
    let circuito = fetch('https://fasterthanall.herokuapp.com/api/tracks/' + id_circuito).then(res => res.json())
        .then(response => response.track.coordinates)
        .then(function (coordenadas) {
            for (coordenada of coordenadas) {
                lat = coordenada.lat;
                lon = coordenada.lon;
                coordenadasArr.push([lat, lon]);
            }
            var polygon = L.polygon([coordenadasArr]).addTo(map);
            console.log(coordenadasArr);
        })    
        
}

function mostrarCamaras(id_circuito){
    let camaras = fetch('https://fasterthanall.herokuapp.com/api/webcams/' + id_circuito).then(res => res.json())
    .then(response => response.webcams)
    .then(function(webcams) {
        for (webcam of webcams) {
            var lat = webcam.coordinate.lat;
            var lon = webcam.coordinate.lon;
            var circle = L.circle([lat, lon], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 5
            }).addTo(map);
        }
    })
}

async function mostrarEvolucionDeCorredor(id_corredor) {
    const response = await fetch('https://fasterthanall.herokuapp.com/api/replays/42/runner/' + id_corredor);
    const posicionesJSON = await response.json();
    const posicionesCorredor = posicionesJSON.positions.checkpoints;

    console.log(id_corredor)
    for (let i = 0; i < posicionesCorredor.length; i++) {
        const lat = posicionesCorredor[i].coordinate.lat;
        const lon = posicionesCorredor[i].coordinate.lon;
        const time = posicionesCorredor[i].timeStamp;

        setTimeout(dibujarPosicion, 2500 * i, lat,lon, new Date(time));
    }
}

async function dibujarPosicion(lat,lon, tiempo) {
    var circle = await L.circle([lat, lon], {
        color: 'purple',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 3
    }).addTo(map);
    circle.bindPopup("Hora: " + tiempo).openPopup();
    setTimeout(remover, 2000, circle);
}

async function remover(layer) {
    layer.remove();
}

async function tiempoDeCorredor(id_corredor) {
    const response = await fetch('https://fasterthanall.herokuapp.com/api/replays/42/runner/' + id_corredor);
    const posicionesJSON = await response.json();
    const posicionesCorredor = await posicionesJSON.positions.checkpoints;
    
    const tiempo = posicionesCorredor[posicionesCorredor.length - 1].timeStamp - posicionesCorredor[0].timeStamp;
    return tiempo;
}

async function generarPosiciones() {
    var response = await fetch('https://fasterthanall.herokuapp.com/api/tracks/42/runners/');
    var resJSON = await response.json();

    var corredores = await resJSON.runners;

    let posiciones = [];

    for(corredor of corredores) {
        const tiempoCorredor = await tiempoDeCorredor(corredor.id);
        console.log(tiempoCorredor);
        let posicion = {id_corredor: corredor.id, nombre: corredor.name, apellido: corredor.surname, tiempo: tiempoCorredor};
        posiciones.push(posicion);

        posiciones.sort((a,b) => a.tiempo - b.tiempo);
    }
    
    return posiciones;
}
