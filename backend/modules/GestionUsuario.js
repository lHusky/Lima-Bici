import { pool } from '../database.js';
import Usuario from './Usuario.js';

class GestionUsuario {

    constructor() { 
        this.listaUsuarios = [];
        //this.usuarioLogueado = null; // Almacena el usuario que ha iniciado sesión
    };

    async agregarUsuarioGestion(usuario){
        if (!(usuario instanceof Usuario)) { 
            throw new Error('Elemento debe ser un objeto de tipo Usuario.'); 
        }
        this.listaUsuarios.push(usuario);
        console.log(`Usuario agregado: ${usuario.getNombre()}`);
    }


    async obtenerUsuariosBD() {
      
        try {
                const [usuarios] = await pool.execute('SELECT id, nombre, email,telefono, contrasena FROM usuario');
                if (usuarios.length === 0) {
                    console.log("No se encontraron usuarios en la base de datos.");
                    return null; 
                }
                for (let usuarioPuntero of usuarios) {
                    const usuario = new Usuario(null, usuarioPuntero.nombre, usuarioPuntero.email, usuarioPuntero.telefono, null, null, usuarioPuntero.contrasena, null, null, null);
                    await this.agregarUsuarioGestion(usuario);
            }
            console.log("Todos los usuarios de la base de datos han sido agregados a la lista.");
            return this.listaUsuarios; 
        } catch (error) {

            if (error.code === 'ER_BAD_DB_ERROR') {
                console.error("Error: La base de datos no existe.");
            } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
                console.error("Error: Acceso denegado a la base de datos.");
            } else if (error.code === 'ER_SYNTAX_ERROR') {
                console.error("Error: Error de sintaxis en la consulta.");
            } else {
                console.error("Error al cargar usuarios desde la base de datos:", error);
            }
            throw error; 
        } 
             
    };


    
    
    
    // Método para registrar un usuario (crea y agrega a la lista)
    async registrarUsuario(nombre, email, contrasena, telefono) {
        const nuevoUsuario = new Usuario(null, nombre, email, telefono, null, null, contrasena, null, null, null);
        const usuarioBD =  await nuevoUsuario.agregarUsuarioBD(nombre, email, telefono, contrasena)
        await this.agregarUsuarioGestion(usuarioBD);
        console.log(`Usuario registrado: ${nuevoUsuario.getNombre()}`);
        return { id: usuarioBD.getId() };
    } 
    

    async consultarUsuariosBD(){
        

    }
    

    


    //1. Obtener de la BD - Tabla Usuario, todos los usuarios y almacenarlos en el gestor como objetos tipo Usuario
    //2. Recorren todos los usuarios y se verifica si coincide el correo y contraseña

    async iniciarSesion(email, contrasena) {
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

export default GestionUsuario;
