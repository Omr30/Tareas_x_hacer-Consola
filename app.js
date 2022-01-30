require('colors');
const { guardarDB, leerDb } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDb();

    if( tareasDB ){
        //Cargar tareas

        tareas.cargarTareasFromArray( tareasDB );
        
    }


    do {
        // Imprimir el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Description:');
                tareas.crearTarea( desc );
                break;
            
            case '2':
                tareas.listadoCompleto()
                break;

            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true)
                break;

            case '4': //listar pendientes
                tareas.listarPendientesCompletadas(false)
                break;

            case '6': //borrar tareas
                const id = await listadoTareasBorrar( tareas.listadoArr );
                // TODO: preguntar si esta seguro
                console.log({id});
                break;
        };

        guardarDB( tareas.listadoArr );


        await pausa();

    } while( opt !== '0' );




};

main();