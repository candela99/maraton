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