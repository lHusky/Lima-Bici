// Usuario.js
import pool from '../database.js';

class Usuario {
    constructor(id, nombre, email, telefono, fechaCumple, fotoPerfil) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.fechaCumple = fechaCumple;
        this.fotoPerfil = fotoPerfil;
    }

    // Métodos Usuario
    static async prueba(){
            return "prueba correcto"
    }
    static async crearUsuario(nombre, email, telefono) {
        // try {
        //     const [result] = await pool.query(
        //         'INSERT INTO usuario (nombre, email, telefono) VALUES (?, ?, ?)',
        //         [nombre, email, telefono]
        //     );
        //     const usuarioID = result.insertId;
        //     return { id: usuarioID };
        // } catch (error) {
        //     console.error('Error en la creación del usuario:', error.message);
        //     throw error;
        // }
        
    }
}

export default Usuario;
