'use strict';

/*
 * Jaureguialzo, Manuela | Fernández Bugna, Florencia
 */

// Discos:
let error = new ErrorMsg();
let flag = 0;
let errorFlag = false;
const campoIncompleto = 'Este campo se cargó vacío';
let listadoDiscos = [];

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

    if (listadoDiscos.length == 0) {
        html += '<p>No hay discos cargados</p>';
    } else {
        let newDisco = ``; 

        for (let disco of listadoDiscos) {
            
            newDisco += `<article class="newDisco">${disco.mostrarDatos()}</article>`
            
            document.getElementById('contenedorDiscos').innerHTML = newDisco;
        }
        html += `<h2>Cantidad de discos cargados: ${listadoDiscos.length}</p>`
        html += `<p>El disco de mayor duración es: <em>${getDiscoMayorDuracion()}</em></p>`;
    }
    document.getElementById('info').innerHTML = html;
}

const Buscar = () => {
    let html = ``;
    let id = prompt('Ingrese el codigo del disco')

    if (listadoDiscos.length >= 1) {
        let existeId = true;
        for (let disco of listadoDiscos) {
            if (disco.getIdDisco() == id) {
                html += disco.mostrarDatos()
                existeId = true
            } else {
                existeId = false;
            }
        }
        if (!existeId) {
            html += `<p>EL ID INGRESADO NO EXISTE</p>`
        }
    } else {
        html += `<p>NO HAY DISCOS CARGADOS</p>`
    }

    document.getElementById('info').innerHTML = html;
}

// Todas las funciones que necesites:
function getDiscoMayorDuracion() {
    let discoMax = 0;
    for (let disco of listadoDiscos) {
        let max = 0;

        if(disco.mostrarDuracionTotal() > max){
            max = disco.mostrarDuracionTotal()
            discoMax = `${disco.getNombreDisco()} con una duracion de ${disco.mostrarDuracionTotal()}"`;
        } 
    }
    return discoMax
}

function validacionEntradaIdDisco(msg) {
    let num
    do {
        if (flag) {
            if (flag == 3) {
                error.showIntentosSuperados();
                errorFlag = true
                num = campoIncompleto;
                resetError()
                break;
            }
        }
        flag++

        num = prompt(msg)
        if (num == null) {
            break
        }
    } while (!validacionIdExistente(num))

    resetError()
    return num
}

function validacionEntradaTexto(msg) {
    let texto;
    do {
        if(flag) {
            error.showTextoInvalido();
            if(flag == 3) {
                error.showIntentosSuperados();
                errorFlag = true
                texto = campoIncompleto;
                resetError()
                break;
            }
        }
        texto = prompt(msg)
        if(texto == null){
            texto = campoIncompleto;
            break
        }
        flag++
    } while (!isNaN(texto))
    resetError()
    return texto
}

function validacionEntradaRango(msg) {
    let valor;
    do {
        if (flag) {
            error.showRangoInvalido();
            if (flag == 3) {
                error.showRangoInvalido();
                errorFlag = true
                valor = campoIncompleto;
                resetError()
                break;
            }
        }
        valor = prompt(msg)
        if (valor == null) {
            valor = campoIncompleto;
            break
        }
        flag++
    } while (!(valor > 0 && valor <= 7200))
    resetError()
    return valor;
}

function resetError() {
    flag = 0;
    errorFlag = false
}

function validacionIdExistente(id) {
    let esValido = true;
    if (isNaN(id)) {
        error.showNumeroIncorrecto();
        esValido = false;
    } else if (!(id >= 1 && id <= 999)) {
        error.showRangoInvalido();
        esValido = false;
    } else {
        for (let disco of listadoDiscos) {
            if (disco.getIdDisco() == id) {
                error.showCodigoDuplicado()
                esValido = false
            }
        }
    }

    return esValido;
}

function Disco() {
    let idDisco;
    let nombreDisco;
    let interprete;
    let pistas = [];

    this.mostrarPistaMayorDuracion = function () {
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

    this.mostrarCantidadPistas = function () {
        return pistas.length;
    }

    this.guardarPista = function (pista) {
        pistas.push(pista);
    }

    

    this.mostrarPistas = function () {
        
        let m = `<p>Pista de mayor duración: ${this.mostrarPistaMayorDuracion()}<p/>`

        for (let pista of pistas) {
            let color;
            (pista.getDuracionPista() > 180) ? color = '"color: red"' : '"color: #fdca40"';

            m += `<p id="pista"> Nombre de la pista: ${pista.getNombrePista()} 
                <span style = ${color}>${pista.getDuracionPista()}"</span><p/>`
        };
        return m;
    }

    this.mostrarDuracionTotal = function () {
        let acum = 0
        for (let pista of pistas) {
            acum = acum + parseInt(pista.getDuracionPista())
        }
        return acum;
    }

    this.mostrarPromedioTotalDuracion = function () {
        let cont = 0;
        for (let i = 0; i < this.mostrarCantidadPistas(); i++) {
            cont++
        }
        return (this.mostrarDuracionTotal() /cont);
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

    this.mostrarDatos = function () {
        let m = `
            <p><strong>Id del disco:</strong> ${this.getIdDisco()}</p>
            <p><strong>Nombre del disco:</strong> ${this.getNombreDisco()}</p>
            <p><strong>Intérprete:</strong> ${this.getInterprete()} </p>
            <p><strong>Duración total del disco:</strong>  ${this.mostrarDuracionTotal()}"</p>
            <p><strong>Promedio total del disco:</strong>  ${this.mostrarPromedioTotalDuracion()}"</p>
            <p><strong>Pistas:</strong> (${this.mostrarCantidadPistas()}) ${this.mostrarPistas()} </p>`;
        return m;
    }

}

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

function ErrorMsg() {
    const numeroIncorrecto = 'Por favor ingrese un número'
    const textoInvalido = 'Por favor ingrese un texto válido'
    const rangoInvalido = 'El numero ingresado está fuera del rango permitido'
    const intentosSuperados = 'Usted superó la cantidad máxima de intentos'
    const codigoDuplicado = 'El codigo ingresado ya existe'

    this.showNumeroIncorrecto = function () {
        alert(numeroIncorrecto);
    }

    this.showTextoInvalido = function () {
        alert(textoInvalido)
    }

    this.showRangoInvalido = function () {
        alert(rangoInvalido)
    }

    this.showIntentosSuperados = function () {
        alert(intentosSuperados)
    }

    this.showCodigoDuplicado = function () {
        alert(codigoDuplicado)
    }
}

let discoPrueba = new Disco();

discoPrueba.setIdDisco(123);
discoPrueba.setNombreDisco("nombre")
discoPrueba.setInterprete("nombreInterprete")

listadoDiscos.push(discoPrueba);

let discoPrueba2 = new Disco();

discoPrueba2.setIdDisco(100);
discoPrueba2.setNombreDisco("El lado oscuro de la let Programación")
discoPrueba2.setInterprete("Los Programadores Anónimos")

listadoDiscos.push(discoPrueba2);

let pistasPrueba = new Pista();
let pistasPrueba2 = new Pista();
let pistasPrueba3 = new Pista();
let pistasPrueba4 = new Pista();

pistasPrueba.setNombrePista("pista1");
pistasPrueba.setDuracionPista(20);
discoPrueba.guardarPista(pistasPrueba);

pistasPrueba2.setNombrePista("pista2");
pistasPrueba2.setDuracionPista(400);
discoPrueba.guardarPista(pistasPrueba2);

pistasPrueba3.setNombrePista("pistita 1");
pistasPrueba3.setDuracionPista(1000);
pistasPrueba4.setNombrePista("pistita 2");
pistasPrueba4.setDuracionPista(100);
discoPrueba2.guardarPista(pistasPrueba3);
discoPrueba2.guardarPista(pistasPrueba4);

