

// Disco 1
let discoPrueba = new Disco();

discoPrueba.setIdDisco(123);
discoPrueba.setNombreDisco("nombre")
discoPrueba.setInterprete("nombreInterprete")

listadoDiscos.push(discoPrueba);

let pistasPrueba = new Pista();

pistasPrueba.setNombrePista("pista1");
pistasPrueba.setDuracionPista(20);

discoPrueba.guardarPista(pistasPrueba);

// Disco 2
let discoPrueba2 = new Disco();

discoPrueba2.setIdDisco(100);
discoPrueba2.setNombreDisco("El lado oscuro de la let Programación")
discoPrueba2.setInterprete("Los Programadores Anónimos")

listadoDiscos.push(discoPrueba2);

    // Disco 2 - Pista 2
let pistasPrueba2 = new Pista();

pistasPrueba2.setNombrePista("pista 2");
pistasPrueba2.setDuracionPista(400);

discoPrueba.guardarPista(pistasPrueba2);

    // Disco 2 - Pista 2
let pistasPrueba3 = new Pista();

pistasPrueba3.setNombrePista("pistita 1");
pistasPrueba3.setDuracionPista(1000);

discoPrueba2.guardarPista(pistasPrueba3);

    // Disco 2 - Pista 3 
let pistasPrueba4 = new Pista();

pistasPrueba4.setNombrePista("pistita 2");
pistasPrueba4.setDuracionPista(100);

discoPrueba2.guardarPista(pistasPrueba4);

