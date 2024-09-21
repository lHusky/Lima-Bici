import { getUsuarioByID, createUsuario } from '../database.js';
import Usuario from './Usuario.js';

class GestionUsuario {
    constructor() {
        this.listaUsuarios = [];
        this.usuarioLogueado = null; // Almacena el usuario que ha iniciado sesión
    }

    async registrarUsuario(nombre, email, contrasena, telefono) {
        try {
            const nuevoUsuario = new Usuario(nombre, email, contrasena, telefono);
            
            // Guardar en la base de datos y obtener el ID del nuevo usuario
            const { id } = await Usuario.crearUsuario(nombre, email, telefono, contrasena);
        
            // Asignar el ID a la instancia del nuevo usuario
            nuevoUsuario.id = id;
            
            // Agregar el nuevo usuario a la lista
            this.listaUsuarios.push(nuevoUsuario);
            
            console.log(`Usuario registrado: ${nombre}`);
        } catch (error) {
            console.error('Error al registrar el usuario:', error.message);
        }
    }

    // Método para iniciar sesión
    iniciarSesion(email, contrasena) {
        const usuario = this.listaUsuarios.find(u => u.email === email && u.contrasena === contrasena);
        if (usuario) {
            usuario.estaLogueado = true;
            this.usuarioLogueado = usuario;
            console.log(`Inicio de sesión exitoso: Bienvenido', ${usuario.nombre}`);
        } else {
            console.log('Error: Email o contraseña incorrectos.');
        }
    }

    // Método para cerrar sesión
    cerrarSesion() {
        if (this.usuarioLogueado) {
            this.usuarioLogueado.estaLogueado = false;
            console.log(`Sesión cerrada: Adiós, ${this.usuarioLogueado.nombre}`);
            this.usuarioLogueado = null; // Eliminamos el usuario logueado
        } else {
            console.log('No hay ningún usuario logueado.');
        }
    }

    // Método para mostrar todos los usuarios (solo para propósitos de ejemplo)
    mostrarUsuarios() {
        this.listaUsuarios.forEach(usuario => {
            console.log(`ID: ${usuario.id}, Nombre: ${usuario.nombre}, Email: ${usuario.email}, Logueado: ${usuario.estaLogueado}`);
        });
    }
}