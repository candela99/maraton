function llamarFuncionAPI(url) {
    fetch(url).then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log(new Error(e)))
}

function obtenerCircuitos(){
    llamarFuncionAPI('https://fasterthanall.herokuapp.com/api/tracks/');
}

function obtenerCircuito(id_circuito){
    llamarFuncionAPI('https://fasterthanall.herokuapp.com/api/tracks/' + id_circuito);
}

function obtenerCorredoresDelCircuito(id_circuito) {
    llamarFuncionAPI('https://fasterthanall.herokuapp.com/api/tracks/' + id_circuito + '/runners/');
}

function obtenerPosicionesDelCircuito(id_circuito){
    llamarFuncionAPI('https://fasterthanall.herokuapp.com/api/replays/' + id_circuito);
}

function obtenerCorredor(id_circuito, id_corredor){
    llamarFuncionAPI('https://fasterthanall.herokuapp.com/api/tracks/'+ id_circuito +'/runners/:runner_id'+ id_corredor);
}

function obtenerPosicionesDeCorredor(id_circuito, id_corredor){
    llamarFuncionAPI('https://fasterthanall.herokuapp.com/api/replays/' + id_circuito + '/runner/' + id_corredor)
}