const formulario = document.querySelector("#formulario");

//crear el evento
formulario.addEventListener( "submit", validarFormulario )

 
//mis funciones
function validarFormulario(e){
    e.preventDefault();
    let exitoso=true;
    const nombre = document.querySelector("#IDnombre").value
    const apellido = document.querySelector("#IDapellido").value
    const dni = document.querySelector("#IDdni").value
    const edad = document.querySelector("#IDedad").value

    const sponsor= document.getElementById("IDsponsor")
    const sponsor1= document.querySelector("#IDsponsor1")
    const sponsor2= document.querySelector("#IDsponsor2")
    const sponsor3= document.querySelector("#IDsponsor3")

    const respuesta = document.getElementById("alCostado");

    const nombreSponsor= document.getElementById("IDnombreSponsor").value;
    const descripcion= document.getElementById("IDdescripcionEmpresa").value;

    respuesta.setAttribute('style', 'white-space: pre;');

    

    respuesta.textContent = "Nombre: " +nombre
    respuesta.textContent += "\r\nApellido: " + apellido
    respuesta.textContent += "\r\nEdad: " + edad
    respuesta.textContent += "\r\nDni: " + dni

    if (sponsor3.checked==true) {
        respuesta.textContent += "\r\nNombre de la empresa/sponsor: " + nombreSponsor
        respuesta.textContent +="\r\nDescripcion de la empresa: " + descripcion
        respuesta.textContent +="\r\nDebera abonar: $*** "
    } else {
        if (sponsor.checked) {
            respuesta.textContent += "\r\n Sponsor: " + sponsor.value
        }
        if (sponsor1.checked) {
            respuesta.textContent += "\r\n Sponsor: " + sponsor1.value
        }
        if (sponsor2.checked) {
            respuesta.textContent += "\r\n Sponsor: " + sponsor2.value
        }
        
    }
   
    if(edad>100 ||edad<1){
        exitoso=false;
        respuesta.textContent+="\r\n Edad no apta"
    }
    
    if (exitoso) {
        respuesta.textContent+="\r\n Incripcion exitosa"
    } else {
        respuesta.textContent+="\r\n no se pudo inscribir"
    }
    document.body.appendChild(alCostado);


}
	
formulario.addEventListener( "reset", LimpiarPantalla )

function LimpiarPantalla(e){
    e.preventDefault();
    const respuesta = document.getElementById("alCostado");

    respuesta.textContent="";
    document.body.appendChild(alCostado);
}