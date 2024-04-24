const { Pool } = require('pg');

const config = {
    host: "127.0.0.1",
    port: 5432,
    database: "always_music",
    user: "postgres",
    password: "7804"
};

const argumentos = process.argv.slice(2);

const pool = new Pool(config);

const agregarEstudiante = async () => {
    try {
        const action = "insert into estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4)";
        let nombre = (argumentos[1]);
        let rut = (argumentos[2]);
        let curso = (argumentos[3]);
        let nivel = (argumentos[4]);
        const values = [nombre, rut, curso, nivel];
    
        const res = await pool.query(action, values);
        console.log(`Estudiante ${nombre} agregado con éxito`);
    } catch (error) {
        console.log("No ha sido posible agregar al estudiante.", error)
    } finally {
        pool.end()
    }
};

const mostrarEstudiantePorRut = async () => {
    try {
        const action = "select * from estudiantes where rut = $1";
        let rut = (argumentos[1]);
        const value = [rut]

        const res = await pool.query(action, value);
        console.log(res.rows);
    } catch (error) {
        console.log("No ha sido posible mostrar al estudiante.", error)
    } finally {
        pool.end()
    }
};

const mostrarEstudiantes = async () => {
    try {
        const action = "select * from estudiantes";

        const res = await pool.query(action);
        console.log("Registro actual", res.rows);
    } catch (error) {
        console.log("No ha sido posible mostrar a los estudiantes.", error)
    } finally {
        pool.end()
    }
};

const editarEstudiante = async () => {
    try {
        const action = "update estudiantes set nombre = $1, rut = $2, curso = $3, nivel = $4 where nombre = $1 or rut = $2 or curso = $3 or nivel = $4";
        let nombre = (argumentos[1]);
        let rut = (argumentos[2]);
        let curso = (argumentos[3]);
        let nivel = (argumentos[4]);
        const values = [nombre, rut, curso, nivel];
    
        const res = await pool.query(action, values);
        console.log(`Estudiante ${nombre} editado con éxito`);
    } catch (error) {
        console.log(error)
    } finally {
        pool.end()
    }
};

const eliminarEstudiante = async () => {
    try {
        const action = "delete from estudiantes where rut = $1";
        let rut = (argumentos[1]);
        const values = [rut];
    
        const res = await pool.query(action, values);
        console.log(`Registro de estudiante con rut ${rut} eliminado`);
    } catch (error) {
        console.log(error)
    } finally {
        pool.end()
    }
};

let argumentoFuncion = argumentos[0];

switch (argumentoFuncion) {
    case 'nuevo':
        agregarEstudiante();
        break;
    case 'rut':
        mostrarEstudiantePorRut();
        break;
    case 'consulta':
        mostrarEstudiantes();
        break;
    case 'editar':
        editarEstudiante();
        break;
    case 'eliminar':
        eliminarEstudiante();
        break;

    default:
        console.log("Por favor ingrese algún método a aplicar")
};