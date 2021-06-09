
function Pista() {
    let nombrePista;
    let duracionPista;

    //getter y setter del nombrePista
    this.setNombrePista = function (nombre) {
        this.nombrePista = nombre;
    }
    this.getNombrePista = function () {
        return this.nombrePista;
    }

    //getter y setter del duracionPista
    this.setDuracionPista = function (duracionPista) {
        this.duracionPista = duracionPista
    }
    this.getDuracionPista = function () {
        return this.duracionPista;
    }
    
}

