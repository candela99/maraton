/*Devuelve tracks = {[0] id = 42, [1] id = 80}*/
function obtenerCircuitos(){
    let circuitos = fetch('https://fasterthanall.herokuapp.com/api/tracks/')
    .then(resp => resp.json())
    .then(data => console.log(data))
}

/*Me devuelve lista de corredores (!MUESTRA SIEMPRE EL MISMO CIRCUITO, NO IMPORTA EL ID!)*/
function obtenerCorredoresDelCircuito(id_circuito) {
    let corredores = fetch('https://fasterthanall.herokuapp.com/api/tracks/' + id_circuito + '/runners/')
    .then(res => res.json())
    .then(corredores => corredores.runners)
    .then(corr => console.log(corr))
    .catch(e => console.log(new Error(e)))
}

/*Obtiene las posiciones de los jugadores en la carrera*/
function obtenerPosicionesDelCircuito(id_circuito){
    let posicionesCircuito = fetch('https://fasterthanall.herokuapp.com/api/replays/' + id_circuito)
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(e => console.log(new Error(e)))
}

/*Me devuelve ID (id), Nombre (name), Apellido (surname) y Sponsor (sponsor)*/
function obtenerCorredor(id_circuito, id_corredor){
    let corredor = fetch('https://fasterthanall.herokuapp.com/api/tracks/'+ id_circuito +'/runners/'+ id_corredor)
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(e => console.log(new Error(e)))
    
}
/*Devuelve positions={checkpoints (lista de objetos) = {coordinate (lon, lat), runner_id, timeStamp}, runner_id}*/
function obtenerPosicionesDeCorredor(id_circuito, id_corredor){
    let posicionesCorredor = fetch('https://fasterthanall.herokuapp.com/api/replays/' + id_circuito + '/runner/' + id_corredor)
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(e => console.log(new Error(e)))
}