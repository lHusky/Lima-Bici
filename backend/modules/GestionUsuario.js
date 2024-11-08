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
    }

    async obtenerUsuariosBD() {
      
        try {
                const [usuarios] = await pool.execute('SELECT id, nombre, email,telefono, contrasena FROM usuario');
                if (usuarios.length === 0) {
                    console.log("No se encontraron usuarios en la base de datos.");
                return this.listaUsuarios;
                }

                for (let usuarioPuntero of usuarios) {
                    //si al menos uno cumple (existe)
                    const existeEnLista = this.listaUsuarios.some(usuario => usuario.getEmail() === usuarioPuntero.email);
                    
                    // Si el usuario no está en la lista, se agrega
                    if (!existeEnLista) {
                        const nuevoUsuario = new Usuario(null, usuarioPuntero.nombre, usuarioPuntero.email, usuarioPuntero.telefono, null, null, usuarioPuntero.contrasena, null, null, null);
                        await this.agregarUsuarioGestion(nuevoUsuario);
                    }
                }
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

        try{
            await this.obtenerUsuariosBD();
            
            // Verificar si el correo existe
            const usuarioEmail = this.listaUsuarios.find(usuario => usuario.getEmail() === email);
            if (usuarioEmail) {
                return { status: 401, message: 'El correo ya está registrado' };
            }
            // Verificar si el telefono existe
            const usuarioTelefono = this.listaUsuarios.find(usuario => usuario.getEmail() === email);
            if(usuarioTelefono){
                return { status: 401, message: 'El número de celular ya está registrado.' };
            }

            const nuevoUsuario = new Usuario(null, nombre, email, telefono, null, null, contrasena, null, null, null);
            const usuarioBD =  await nuevoUsuario.agregarUsuarioBD(nombre, email, telefono, contrasena)
            await this.agregarUsuarioGestion(usuarioBD);
            
            console.log(`Registro exitoso: ${usuario.getNombre()}`);
            return { status:200, usuario: nuevoUsuario };
           
        }catch (error) {
            console.log('Error al registrar usuario', error);
            return { status: 500, message: 'Error en el servidor.' }; // Manejo de error
        }
    } 
    

    async iniciarSesion(email, contrasena) {
        try {
            await this.obtenerUsuariosBD();
            
            // Verificar si el correo existe
            const usuario = this.listaUsuarios.find(usuario => usuario.getEmail() === email);
    
            // Si el correo no existe
            if (!usuario) {
                return { status: 401, message: 'Correo no registrado.' };
            }
    
            // Si el correo es correcto, verificar la contraseña
            if (usuario.getContrasena() !== contrasena) {
                console.log('Contraseña incorrecta');
                return { status: 401, message: 'Contraseña incorrecta.' };
            }
    
            // Si el correo y la contraseña son correctos
            console.log(`Inicio de sesión exitoso: Bienvenido ${usuario.getNombre()}`);
            return { status: 200, user: usuario }; // Retorna el usuario si se encuentra y coincide la contraseña
        } catch (error) {
            console.log('Error al iniciar sesión:', error);
            return { status: 500, message: 'Error en el servidor.' }; // Manejo de error
        }
    }
    
    
    async obtenerUsuarioPorEmail(email) {
        try {
            const [usuarios] = await pool.execute(
                'SELECT id, nombre, email, telefono, contrasena FROM usuario WHERE email = ? LIMIT 1',
                [email]
            );
    
            if (usuarios.length === 0) {
                console.log(`No se encontró un usuario con el email: ${email}`);
                return null; 
            }
    
            const usuarioPuntero = usuarios[0];
            const usuario = new Usuario(
                usuarioPuntero.id,
                usuarioPuntero.nombre,
                usuarioPuntero.email,
                usuarioPuntero.telefono,
                null, null, 
                usuarioPuntero.contrasena,
                null, null, null,
                usuarioPuntero.verificationCode,
                usuarioPuntero.verificationCodeExpires,
            );
    
            console.log(`Usuario encontrado: ${usuario.getNombre()}`);
            return usuario;
    
        } catch (error) {
            if (error.code === 'ER_BAD_DB_ERROR') {
                console.error("Error: La base de datos no existe.");
            } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
                console.error("Error: Acceso denegado a la base de datos.");
            } else if (error.code === 'ER_SYNTAX_ERROR') {
                console.error("Error: Error de sintaxis en la consulta.");
            } else {
                console.error("Error al buscar el usuario en la base de datos:", error);
            }
            throw error; 
        }
    }

    async asignarCodVerificacion(email) {
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        const expiracion = new Date(Date.now() + 600000); 

        try {

            const usuario = await this.obtenerUsuarioPorEmail(email);

            if(!usuario){
                return null;
            }

            await pool.execute(
                'UPDATE usuario SET verificationCode = ?, verificationCodeExpires = ? WHERE email = ?',
                [codigo, expiracion, email]
            );
            console.log(`Código de verificación generado para el usuario con email: ${email}`);
            return {codigo};
        } catch (error) {
            console.error('Error al generar código de verificación:', error);
            throw error;
        }
    }

    async obtenerCodVerificacion(email) {
        try {
            const [rows] = await pool.execute(
                'SELECT verificationCode, verificationCodeExpires FROM usuario WHERE email = ?',
                [email]
            );
            console.log(rows[0]);

            if (rows.length === 0) {
                console.log(`No se encontró un usuario con el email: ${email}`);
                return null;
            }
            const hoy = new Date(Date.now());

            if (!rows[0].verificationCode) {
                console.log(`No se encontró un código de verificación para el usuario con email: ${email}`);
                return { status: 404, message: 'Código de verificación no disponible' };
            }

            if (hoy > rows[0].verificationCodeExpires) {
                return { status: 410, message: 'El código de verificación ha expirado' };
            }
            console.log(rows[0].verificationCodeExpires);
            console.log(rows[0].verificationCode);
            console.log(`Código de verificación encontrado para usuario con email: ${email}`);
            return { status: 200, codigo: rows[0].verificationCode };
    
        } catch (error) {
            console.error('Error al obtener código de verificación:', error);
            throw error;
        }
    }

    async actContraseña(email, contrasena) {
        try {
            const [result] = await pool.execute(
                'UPDATE usuario SET contrasena = ? WHERE email = ?',
                [contrasena, email]
            );
    
            if (result.affectedRows === 0) {
                console.log(`No se encontró un usuario con el email: ${email}`);
                return null;  // No se actualizó ninguna fila
            }
    
            console.log(`Contraseña actualizada para el usuario con email: ${email}`);
            return { status: 200, message: 'Contraseña actualizada correctamente' };
    
        } catch (error) {
            console.error('Error al actualizar la contraseña en la base de datos:', error);
            throw error;
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
