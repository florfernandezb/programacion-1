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
    
    //Carga de discos
    let disco = new Disco();
    disco.setIdDisco(validacionEntradaIdDisco('Ingrese el codigo del disco'));

    disco.setNombreDisco(validacionEntradaTexto('Ingrese el nombre del disco'));

    disco.setInterprete(validacionEntradaTexto('Ingrese el nombre del intérprete'));

    //Carga de pistas
    do {
        let pista = new Pista();
        pista.setNombrePista(validacionEntradaTexto('Ingrese el nombre de la pista'));

        pista.setDuracionPista(
            validacionEntradaRango('ingrese duracion pista')
        );
        disco.guardarPista(pista);
    } while (confirm('Desea ingresar otra pista?'))

    listadoDiscos.push(disco);

}

// Función Mostrar:
const Mostrar = () => {
    // Variable de datos generales sobre los discos:
    let html = ``;

    // Validación en caso no de haber discos precargados
    if (listadoDiscos.length == 0) {
        html += '<p>No hay discos cargados</p>';
    } else {
        // Variable para ir armando la cadena:
        let newDisco = ``; 

        for (let disco of listadoDiscos) {
            // Carga de tarjeta correspondiente a cada disco
            newDisco += `<article class="newDisco">${disco.getDatos()}</article>`;
            
            document.getElementById('contenedorDiscos').innerHTML = newDisco;
        }
        html += `<h2>Cantidad de discos cargados: ${listadoDiscos.length}</p>`;
        html += `<p>El disco de mayor duración es: <em>${getDiscoMayorDuracion()}</em></p>`;
    }

    // Carga de datos generales sobre los discos
    document.getElementById('info').innerHTML = html;
}

const Buscar = () => {
    let html = ``;
    let id = prompt('Ingrese el codigo del disco');

    if (listadoDiscos.length >= 1) {
        let existeId = false;
        for (let disco of listadoDiscos) {
            if (disco.getIdDisco() == id) {
                html += `<div class="busquedaDisco newDisco">${disco.getDatos()}</div>`;
                existeId = true;
                document.getElementById('contenedorDiscos').style.display = "none"
            } 
        }
        if (!existeId) {
            html += `<p>EL ID INGRESADO NO EXISTE</p>`;
        }
    } else {
        html += `<p>NO HAY DISCOS CARGADOS</p>`;
    }

    document.getElementById('info').innerHTML = html;
}

// Todas las funciones que necesites:

// Funcion para mostrar el disco con mayor duracion
function getDiscoMayorDuracion() {
    let discoMayorDuracion = 0;
    for (let disco of listadoDiscos) {
        let mayor = 0;

        if(disco.getDuracionTotal() > mayor){
            mayor = disco.getDuracionTotal();
            discoMayorDuracion = `${disco.getNombreDisco()} con una duracion de ${disco.getDuracionTotal()}"`;
        } 
    }
    return discoMayorDuracion;
}

function validacionEntradaIdDisco(msg) {
    let num;
    do {
        if (flag) {
            if (flag == 3) {
                error.showIntentosSuperados();
                errorFlag = true
                num = campoIncompleto;
                resetError();
                break;
            }
        }
        flag++;

        // No usamos parseInt para poder validar (num == null) 
        num = prompt(msg);
        if (num == null) {
            break;
        }
    } while (!validacionIdExistente(num))
    resetError();
    return num;
}

function validacionEntradaTexto(msg) {
    let texto;
    do {
        if(flag) {
            error.showTextoInvalido();
            if(flag == 3) {
                error.showIntentosSuperados();
                errorFlag = true;
                texto = campoIncompleto;
                resetError();
                break;
            }
        }
        texto = prompt(msg)
        if(texto == null){
            texto = campoIncompleto;
            break;
        }
        flag++;
    } while (!isNaN(texto))
    resetError();
    return texto;
}

function validacionEntradaRango(msg) {
    let valor;
    do {
        if (flag) {
            error.showRangoInvalido();
            if (flag == 3) {
                error.showRangoInvalido();
                errorFlag = true;
                valor = campoIncompleto;
                resetError();
                break;
            }
        }
        valor = prompt(msg)
        if (valor == null) {
            valor = campoIncompleto;
            break;
        }
        flag++
    } while (!(valor > 0 && valor <= 7200))
    resetError();
    return valor;
}

// Funcion que se ejecuta luego de cada validación para resetear los intentos
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
                error.showCodigoDuplicado();
                esValido = false;
            }
        }
    }

    return esValido;
}

