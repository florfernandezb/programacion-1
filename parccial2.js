'use strict';


function CargarDisco() {
    let nombreDelDisco;
    let banda;
    let codigoDelDisco = 1;
    let pistas = [];

    this.pedirNombreDisco = () => {
        do {
            nombreDelDisco = prompt('Ingrese el nombre del disco:');
        } while (!isNaN(nombreDelDisco));
    }

    this.devolverNombreDelDisco = () => {
        return nombreDelDisco;
    }

    this.pedirBanda = () => {
        do {
            banda = prompt('Ingrese el nombre de la banda o artiste:');
        } while (!isNaN(banda));
        return banda;
    }

    this.devolverNombreDeLabanda = () => {
        return banda;
    }
    this.mostrarDatos = () => {
        let m = `<p> <strong>Nombre del disco:</strong> ${nombreDelDisco}; <strong>Nombre de la banda o artista:</strong> ${banda} </p>`;
        return m;
    }

    /*function Pista(){
        let nombrePista;
        let duracion; 
        
        this.pedirNombrePista = () =>{
            do{
                nombrePista = prompt('Ingrese el nombre del disco:');
            } while (!isNaN(nombrePista));
            }
     
        this.devolverNombrePista = () => {
            return nombrePista;
            }
        
        this.duracionPista = () => {
            do{
                duracion = parseInt(prompt('Ingrese duracion de la pista:'));
            }while(!( duracion > 0 &&  duracion <= 7200));
        }
     
        this.devolverDuracionPista = () => {
            return duracion;
            }
        this.mostrarDatos = () => {
            let m = `<p> <strong>Nombre de la pista:</strong> ${nombrePista}; <strong>Duracion de la pista:</strong> ${duracion} </p>`;
                return m ;
             } 
    }*/

}


let listaDeDisco = [];

const Cargar = () => {
    let disco = new CargarDisco();
    disco.pedirNombreDisco();
    disco.pedirBanda();
    listaDeDisco.push(disco);

}

const Mostrar = () => {
    let m = '';
    for (let disco of listaDeDisco) {
        m += disco.mostrarDatos();
    }
    document.getElementById('info').innerHTML = m;
}



