const pool = require("../Conexion BD/database.js")


//Utilidad:
    // Se crearán todas las clases aquí 
//Averiguar:
    // es dificil crear clases de node js?
    // como definir las relaciones entre clases en node js?

//Clase usuario

class Usuario{
    constructor(id, nombre, email, telefono, fechaCumple, fotoPerfil){
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.fechaCumple = fechaCumple;
        this.fotoPerfil = fotoPerfil;
    }

    //Metodos Usuario

    static async crearUsuario(nombre, email, telefono) {
      try {
          const [result] = await pool.query(
              'INSERT INTO usuario (nombre, email, telefono) VALUES (?, ?, ?)',
              [nombre, email, telefono]
          );
          const usuarioID = result.insertId;
          return { id: usuarioID };
      } catch (error) {
          console.error('Error en la creación del usuario:', error.message);
          throw error;
      }
  }

}

module.exports = Usuario;

//Clase Perfil_Login (Pantalla inicial de la app)

class Perfil_Login{
    constructor(id, id_PerfilSesion, usuario, contrasena, intentosFallidos, id_usuario){
        this.id = id;
        this.id_PerfilSesion = id_PerfilSesion;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.intentosFallidos = intentosFallidos;
        this.id_usuario = id_usuario;
    }

    //Metodos Perfil_Login

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

    olvideContrasena() {
        console.log("Recuperar contraseña...");
      }
    
    actualizarContrasena(nuevaContrasena) {
        this.contrasena = nuevaContrasena;
        console.log("Contraseña actualizada.");
      }
    
      static async iniciarSesion(email) {
        try {
            // Consultar database
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
            // falta verificar contraseña (puede ser con bcrypt)
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

module.exports = Perfil_Login;