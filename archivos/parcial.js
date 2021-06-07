'use strict';

/*
 * Jaureguialzo, Manuela | Fernández Bugna, Florencia
 */

// Discos:
let error = new ErrorMsg();
let flag = 0;
let errorFlag = false;
const campoIncompleto = 'Este campo se cargó vacío';
let listadoDiscos = [ ];

// Función Cargar:
const Cargar = () => {
    let disco = new Disco();
    disco.setIdDisco(validacionEntradaIdDisco('Ingrese el codigo del disco'))
    
    disco.setNombreDisco(validacionEntradaTexto('Ingrese el nombre del disco'))

    disco.setInterprete(validacionEntradaTexto('Ingrese el nombre del intérprete'))

    //Carga de pistas
    do {
        let pista = new Pista()
        pista.setNombrePista(validacionEntradaTexto('Ingrese el nombre de la pista'))

        pista.setDuracionPista(
            validacionEntradaRango('ingrese duracion pista')
        )
        disco.guardarPista(pista)
    } while (confirm('Desea ingresar otra pista?'))
    
    listadoDiscos.push(disco)

}

// Función Mostrar:
const Mostrar = () => {
    // Variable para ir armando la cadena:
    let html = ``;

    if(listadoDiscos.length == 0) {
        html += '<p>No hay discos cargados</p>';
        } else {
        for (let disco of listadoDiscos) {
            html += disco.mostrarDatos()
        }
        html += `<p>cantidad de discos cargados ${listadoDiscos.length}</p>`
    }

    
    document.getElementById('info').innerHTML = html;
}

const Buscar = () => {
    let html = ``;
    let id = prompt('Ingrese el codigo del disco')
    // const id = () => {
    //     do {
    //         prompt('Ingrese el codigo del disco')
    //     } while(!(isNaN(id)) )
    //     return id
    // } 
    if(listadoDiscos.length >= 1) {
        for (let disco of listadoDiscos) {
            if(disco.getIdDisco() == id) {
                html += disco.mostrarDatos()
            } else {
                html += `<p>EL ID INGRESADO NO EXISTE</p>`
            }
        }
    } else {
        html += `<p>NO HAY DISCOS CARGADOS</p>`
    }

    document.getElementById('info').innerHTML = html;
}

// Todas las funciones que necesites:

function validacionEntradaIdDisco(msg) {
    let num
    do {
        if(flag) {
            if(flag == 3) {
                error.showIntentosSuperados();
                errorFlag = true
                num = campoIncompleto;
                resetError()
                break;
            }
        }
        flag++
        
        num = prompt(msg)
        if(num == null){
            break
        } 
    } while (!validacionIdExistente(num))
    
    resetError()
    return num
}

function validacionEntradaTexto(msg) {
    let texto;
    do {
        // if(flag) {
        //     error.showTextoInvalido();
        //     if(flag == 3) {
        //         error.showIntentosSuperados();
        //         errorFlag = true
        //         texto = campoIncompleto;
        //         resetError()
        //         break;
        //     }
        // }
        texto = prompt(msg)
        // if(texto == null){
        //     texto = campoIncompleto;
        //     break
        // }
        flag++
    } while (!isNaN(texto))
    resetError()
    return texto
}

function validacionEntradaRango(msg) {
    let valor;
    do {
        if(flag) {
            error.showRangoInvalido();
            if(flag == 3) {
                error.showRangoInvalido();
                errorFlag = true
                valor = campoIncompleto;
                resetError()
                break;
            }
        }
        valor = prompt(msg)
        if(valor == null){
            valor = campoIncompleto;
            break
        }
        flag++
    } while(!(valor > 0 && valor <= 7200))
    resetError()
    return valor;
}

function resetError() {
    flag = 0;
    errorFlag = false
}

function validacionIdExistente(id) {
    let esValido = true;
    if(isNaN(id)) {
        error.showNumeroIncorrecto();
        esValido = false;
    }  else if (!(id >= 1 && id <= 999)) {
        error.showRangoInvalido();
        esValido = false;
    } else {
        for (let disco of listadoDiscos) {
            if(disco.getIdDisco() == id) {
                error.showCodigoDuplicado()
                esValido = false
            }
        }
    }

    return esValido;
}

function Disco() {
    let idDisco = 0
    let nombreDisco = 'El lado oscuro de la let Programación'
    let interprete = 'Los Programadores Anónimos'

    let pistas = [];

    this.guardarPista = function(pista) {
        pistas.push(pista);
    }

    this.mostrarPistas = function() {
        let m = '';
		for (let pista of pistas) {
			m += pista.mostrarDatosPista();
		};
	    return m;
    }

    this.mostrarDuracionTotal = function() {
        //TODO
    }

    this.mostrarPromedioTotalDuracion = function() {
        //TODO
    }

    //getter y setter idDisco
    this.setIdDisco = function(id)  {
        this.idDisco = id;
    }
    this.getIdDisco = () => {
        return this.idDisco;
    }

    //getter y setter nombreDisco
    this.setNombreDisco = function(nombre)  {
        this.nombreDisco = nombre;
    }
    this.getNombreDisco = function() {
        return this.nombreDisco
    }

    //getter y setter interprete
    this.setInterprete = function(id)  {
        this.interprete = id;
    }
    this.getInterprete = function() {
        return this.interprete
    }

    this.mostrarDatos = function() {
		let m = `
			<p><strong>Id disco:</strong> ${this.getIdDisco()} <strong>nombre disco:</strong> ${this.getNombreDisco()} <strong>interprete:</strong> ${this.getInterprete()} <strong>PISTAS BB:</strong> ${this.mostrarPistas()}`;
        return m;
	}
    
}

function Pista() {
    let nombrePista = 'Esa cajita loca llamada variablecita'
    let duracionPista = 200
    this.mayorDuracionPista = function() {
        //TODO
    }

    //getter y setter del nombrePista
    this.setNombrePista = function(nombre)  {
        this.nombrePista = nombre;
    }
    this.getNombrePista = function() {
        return this.nombrePista;
    }

    //getter y setter del duracionPista
    this.setDuracionPista = function(duracionPista) {
        this.duracionPista = duracionPista
    }
    this.getDuracionPista = function() {
        return this.duracionPista;
    }

    this.mostrarDatosPista = () => {
        let m = `Nombre: ${this.getNombrePista()} - Duracion pista: ${this.getDuracionPista()}`;
        return m
    }
}

function ErrorMsg() {
    const numeroIncorrecto = 'Por favor ingrese un número'
    const textoInvalido = 'Por favor ingrese un texto válido'
    const rangoInvalido = 'El numero ingresado está fuera del rango permitido'
    const intentosSuperados = 'Usted superó la cantidad máxima de intentos'
    const codigoDuplicado = 'El codigo ingresado ya existe'

    this.showNumeroIncorrecto = function() {
        alert(numeroIncorrecto);
    }

    this.showTextoInvalido = function() {
        alert(textoInvalido)
    }

    this.showRangoInvalido = function() {
        alert(rangoInvalido)
    }

    this.showIntentosSuperados = function() {
        alert(intentosSuperados)
    }

    this.showCodigoDuplicado = function() {
        alert(codigoDuplicado)
    }
}
