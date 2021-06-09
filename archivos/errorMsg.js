
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