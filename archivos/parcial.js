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
    let discoMax;

    if (listadoDiscos.length == 0) {
        html += '<p>No hay discos cargados</p>';
    } else {
        for (let disco of listadoDiscos) {
            let max = 0;
            
            html += disco.mostrarDatos()

            html += `<p>Cantidad de pistas del disco: ${disco.mostrarCantidadPistas()} <p>`

            html += `<p>Duración total del disco: ${disco.mostrarDuracionTotal()}</p>`
            html += `<p>Promedio total del disco: ${disco.mostrarPromedioTotalDuracion()}</p>`
            html += `<p>Pista de mayor duración: ${disco.mostrarPistaMayorDuracion()}</p>`

            if(disco.mostrarDuracionTotal() > max){
                max = disco.mostrarDuracionTotal()
                discoMax = disco.getNombreDisco() + ` (` + disco.mostrarDuracionTotal() + `")`;
                
            } 
            
        }
        html += `<p>cantidad de discos cargados ${listadoDiscos.length}</p>`
    }

    html += `<p>El disco de mayor duración entre todos los discos es: ${discoMax}</p>`;

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
    let idDisco = 0
    let nombreDisco = 'El lado oscuro de la let Programación'
    let interprete = 'Los Programadores Anónimos'
    let pistas = [];

    this.mostrarPistaMayorDuracion = function () {
        let max = 0;
        let n = 0;
        let cont = 0;
        let pistaMax = '';
        for (let pista of pistas) {
            n = pista.getDuracionPista()
            if(pista.getDuracionPista() > max){
                max = pista.getDuracionPista()
                pistaMax = pista.getNombrePista() + ` (` + pista.getDuracionPista() + `")`;
            } 
            
        }

        return `<p> MAX ${pistaMax}</p>`
    }

    this.mostrarCantidadPistas = function () {
        return pistas.length;
    }

    this.guardarPista = function (pista) {
        pistas.push(pista);
    }

    

    this.mostrarPistas = function () {
        let m = '';
        for (let pista of pistas) {
            m += `<p> <strong> Nombre de la pista: </strong> ${pista.getNombrePista()} <p/>`
            let color = ``
            let msg = `<strong> Duración: </strong> ${pista.getDuracionPista()}`

            let duracion = (pista.getDuracionPista() > 180) ? color = `<p style = "color: red">${msg}</p>` : color = `<p>${msg}</p>`
            m += duracion;
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
			<p><strong>Id disco:</strong> ${this.getIdDisco()} <strong>nombre disco:</strong> ${this.getNombreDisco()} <strong>interprete:</strong> ${this.getInterprete()} <strong>PISTAS:</strong> ${this.mostrarPistas()}`;
        return m;
    }

}

function Pista() {
    let nombrePista = 'Esa cajita loca llamada variablecita'
    let duracionPista = 200

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
discoPrueba2.setNombreDisco("nombreDisco2")
discoPrueba2.setInterprete("nombreInterprete2")

listadoDiscos.push(discoPrueba2);

let pistasPrueba = new Pista();
let pistasPrueba2 = new Pista();
let pistasPrueba3 = new Pista();

pistasPrueba.setNombrePista("pista1");
pistasPrueba.setDuracionPista(20);
pistasPrueba2.setNombrePista("pista2");
pistasPrueba2.setDuracionPista(40);
discoPrueba.guardarPista(pistasPrueba);
discoPrueba.guardarPista(pistasPrueba2);

pistasPrueba3.setNombrePista("pistita2");
pistasPrueba3.setDuracionPista(100);
discoPrueba2.guardarPista(pistasPrueba3);

