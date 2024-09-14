// Perfil_Login.js
import { getUsuarioByID, createUsuario } from '../database.js';

class Perfil_Login {
    constructor(id, id_PerfilSesion, usuario, contrasena, intentosFallidos, id_usuario) {
        this.id = id;
        this.id_PerfilSesion = id_PerfilSesion;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.intentosFallidos = intentosFallidos;
        this.id_usuario = id_usuario;
    }

    // Métodos Perfil_Login
    static async crearPerfil(id_usuario, contrasena, email) {
        try {
            const [result] = await pool.query(
                'INSERT INTO perfil_login (usuario, contrasena, id_usuario) VALUES (?, ?, ?)',
                [email, contrasena, id_usuario]
            );
            const perfilID = result.insertId;
            return { id: perfilID };
        } catch (error) {
            console.error('Error en la creación del perfil:', error.message);
            throw error;
        }
    }

    // Otros métodos
    olvideContrasena() {
        console.log("Recuperar contraseña...");
    }

    actualizarContrasena(nuevaContrasena) {
        this.contrasena = nuevaContrasena;
        console.log("Contraseña actualizada.");
    }

    static async iniciarSesion(email) {
        try {
            const [rows] = await pool.query(
                `SELECT p.id, u.id as id_usuario, p.usuario 
                 FROM perfil_Login p 
                 JOIN usuario u ON p.id_usuario = u.id 
                 WHERE u.email = ?`,
                [email]
            );

            if (rows.length === 0) {
                console.log("Usuario no encontrado.");
                return false;
            }

            const perfil = rows[0];
            console.log(`Perfil encontrado: ID del perfil = ${perfil.id}, ID del usuario = ${perfil.id_usuario}`);
            return true;
        } catch (error) {
            console.error('Error en el inicio de sesión:', error.message);
            throw error;
        }
    }

    cerrarSesion() {
        console.log(`Cerrando sesión para el usuario: ${this.usuario}`);
    }

    actualizarUsuario(nuevoUser) {
        console.log("Actualizando datos del usuario...");
    }
}

export default Perfil_Login;
