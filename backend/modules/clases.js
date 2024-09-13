import { createUsuario } from './database.js'; 


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

    //Metodos(?
}

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

    async crearUsuario(nombre, email, telefono) {
        try {
          // Llama a la función createUsuario para insertar en la base de datos
          const nuevoUsuario = await createUsuario(nombre, email, telefono);
    
          // Actualiza el ID de usuario con el ID del usuario recién creado
          this.id_usuario = nuevoUsuario.id;
    
          console.log(`Usuario creado exitosamente con ID: ${this.id_usuario}`);
        } catch (error) {
          console.error('Error en la creación del usuario:', error.message);
        }
      }

    olvideContrasena() {
        console.log("Recuperar contraseña...");
      }
    
    actualizarContrasena(nuevaContrasena) {
        this.contrasena = nuevaContrasena;
        console.log("Contraseña actualizada.");
      }
    
    iniciarSesion() {
        console.log(`Iniciando sesión para el usuario: ${this.usuario}`);
      }
    
    cerrarSesion() {
        console.log(`Cerrando sesión para el usuario: ${this.usuario}`);
      }
    
    actualizarUsuario(nuevoUser) {
        console.log("Actualizando datos del usuario...");
      }
}