function Disco(
    idDisco = 0, 
    nombreDisco = 'El lado oscuro de la Programación', 
    interprete = 'Los Programadores Anónimos') {

    this.idDisco = idDisco
    this.nombreDisco = nombreDisco
    this.interprete = interprete
    let pistas = [new Pista()]

    this.mostrarDuracionTotal = function() {
        console.log(pista)
    }

    this.mostrarPromedioTotalDuracion = function() {
        //TODO
    }

    this.cargarPista = function() {
        
    }
}

function Pista() {
    let nombrePista = 'Esa cajita loca llamada variablecita'
    let duracionPista = 200
    this.mayorDuracionPista
}

