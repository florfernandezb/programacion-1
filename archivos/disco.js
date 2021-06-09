
function Disco() {
    let idDisco;
    let nombreDisco;
    let interprete;
    let pistas = [];

    this.getPistaMayorDuracion = function () {
        let mayor = 0;
        let pistaMax = '';
        let color = ''
        
        for (let pista of pistas) {

            if(pista.getDuracionPista() > mayor){
                mayor = pista.getDuracionPista()
                mayor > 180 ? color = '"color: red"' : '"color: #fdca40"'
                pistaMax = ` ${pista.getNombrePista()} <span style = ${color}>${pista.getDuracionPista()}"<span>`;
            } 
            
        }
        return pistaMax;
    }

    this.getCantidadPistas = function () {
        return pistas.length;
    }

    this.guardarPista = function (pista) {
        pistas.push(pista);
    }

    

    this.getPistas = function () {
        
        let m = `<p>Pista de mayor duración: ${this.getPistaMayorDuracion()}<p/>`

        for (let pista of pistas) {
            let color;
            (pista.getDuracionPista() > 180) ? color = '"color: red"' : '"color: #fdca40"';

            m += `<p id="pista"> Nombre de la pista: ${pista.getNombrePista()} 
                <span style = ${color}>${pista.getDuracionPista()}"</span><p/>`
        };
        return m;
    }

    this.getDuracionTotal = function () {
        let acum = 0
        for (let pista of pistas) {
            acum = acum + parseInt(pista.getDuracionPista())
        }
        return acum;
    }

    this.getPromedioTotalDuracion = function () {
        let cont = 0;
        for (let i = 0; i < this.getCantidadPistas(); i++) {
            cont++
        }
        return (this.getDuracionTotal() /cont);
    }

    //getter y setter idDisco
    this.setIdDisco = function (id) {
        this.idDisco = id;
    }
    this.getIdDisco = () => {
        return this.idDisco;
    }

    //getter y setter nombreDisco
    this.setNombreDisco = function (nombre) {
        this.nombreDisco = nombre;
    }
    this.getNombreDisco = function () {
        return this.nombreDisco
    }

    //getter y setter interprete
    this.setInterprete = function (id) {
        this.interprete = id;
    }
    this.getInterprete = function () {
        return this.interprete
    }

    this.getDatos = function () {
        let m = `
            <p><strong>Id del disco:</strong> ${this.getIdDisco()}</p>
            <p><strong>Nombre del disco:</strong> ${this.getNombreDisco()}</p>
            <p><strong>Intérprete:</strong> ${this.getInterprete()} </p>
            <p><strong>Duración total del disco:</strong>  ${this.getDuracionTotal()}"</p>
            <p><strong>Promedio total del disco:</strong>  ${this.getPromedioTotalDuracion()}"</p>
            <p><strong>Pistas:</strong> (${this.getCantidadPistas()}) ${this.getPistas()} </p>`;
        return m;
    }

}