import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();


//database
// modelo  -- clases () 
// rutas / controladores por clase (dividido) -- acceso a ese modelo   (comunicacion entre las clases)
// view -- 


const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getUsuarioByID(id) {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?',[id]);  // Aquí es donde corregimos el paso de parámetros
    return rows[0];
}

export async function getObjetivoByID(id) {
    const [row]= await pool.query('SELECT * FROM objetivo WHERE id= ?',[id] )
    return row[0];
}

export async function getRutaByID(id) {
    const [row]= await pool.query('SELECT * FROM ruta WHERE id= ?',[id] )
    return row[0];
}

export async function getPuntoInteresByID(id) {
    const [row]= await pool.query('SELECT * FROM punto_interes WHERE id= ?',[id] )
    return row[0];
}

export async function getPerfilLoginByID(id) {
    const [row]= await pool.query('SELECT * FROM perfil_Login WHERE id= ?',[id] )
    return row[0];
}
// Funciones para crear usuario
// export async function createUsuario(nombre,email,telefono) {
//     const [result]= await pool.query(
//         `INSERT INTO usuario(nombre,email,telefono) 
//          VALUES (?,?,?)`
//         ,[nombre,email,telefono]);
//     const usuarioID = result.insertId;
//     return usuarioID;
// }

export async function createUsuario(nombre, email, telefono) {
    try {
        // Inserta un nuevo usuario y obtiene el resultado
        const [result] = await pool.query(
            `INSERT INTO usuario (nombre, email, telefono) VALUES (?, ?, ?)`,
            [nombre, email, telefono]
        );
        // Obtiene el ID del nuevo usuario insertado
        const usuarioID = result.insertId;
        // Devuelve un objeto con el ID del nuevo usuario
        return { id: usuarioID };
    } catch (error) {
        console.error('Error en la inserción del usuario:', error);
        throw error;
    }
}

// export async function createPerfilLogin(nombre,email,telefono,usuario,contrasenha) {
//     const id_usuario = createUsuario(nombre,email,telefono);
//     const [result]= await pool.query(`INSERT INTO perfil_Login(usuario,contrasenha,id_usuario) 
//         VALUES (?,?,?) `,[usuario,contrasenha,id_usuario]);
//     console.log(result) ;
// }

export async function createPerfilLogin(nombre, email, telefono, usuario, contrasenha) {
    try {
        // Espera a que createUsuario se complete y obtén el ID del nuevo usuario
        const nuevoUsuario = await createUsuario(nombre, email, telefono);
        const id_usuario = nuevoUsuario.id; // Usa el ID del nuevo usuario

        // Inserta en perfil_Login usando el ID del nuevo usuario
        const [result] = await pool.query(
            `INSERT INTO perfil_Login (usuario, contrasenha, id_usuario) 
             VALUES (?, ?, ?)`,
            [usuario, contrasenha, id_usuario]
        );

        // Muestra el resultado de la inserción
        console.log(result);
    } catch (error) {
        console.error('Error en la inserción:', error);
    }
}



export async function toggleCompleted(id, value) {
    const newValue = value === true ? "TRUE" : "FALSE";
    const [result] = await pool.query(
      `
      UPDATE todos
      SET completed = ${newValue} 
      WHERE id = ?;
      `,
      [id]
    );
    return result;
  }
  
  export async function shareTodo(todo_id, user_id, shared_with_id) {
    const [result] = await pool.query(
      `
      INSERT INTO shared_todos (todo_id, user_id, shared_with_id) 
      VALUES (?, ?, ?);
      `,
      [todo_id, user_id, shared_with_id]
    );
    return result.insertId;
  }