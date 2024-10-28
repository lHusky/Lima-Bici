// Importa las clases utilizando `import` ya que estás en un entorno ES Module
// import GestionUsuario from '../modules/GestionUsuario.js'
import { gestor } from '../app.js'; 
// CONTROLADOR: Registrar Usuario
const crearUsuario = async (req, res) => {
    
    const {nombre, email, telefono, password } = req.body;

    try {
        // Crear usuario y obtener id_usuario
        const { id: usuarioID } = await gestor.registrarUsuario(nombre, email,password, telefono);
        console.log(`USUARIO CONTROLADOR`);
        // Éxito - aprobación de creación de objeto
        res.status(201).json({
            message: 'Usuario creados exitosamente',
            usuarioID
        });
        console.log(`MENSAJE DE EXITO ENVIADO`);
    } catch (error) { 
        console.error('Error al crear el usuario (controlador):', error.message); // Añadido para debug
        res.status(500).json({
            message: 'Error al crear el usuario (controlador):',
            error: error.message
        });
    }
};

const cargarUsuarios = async (req, res) => {
    try{
        const usuariosAgregados = await gestor.obtenerUsuariosBD();

        if (!usuariosAgregados) {
            return res.status(404).json({  //404: no se encontro elemento
                message: 'No se encontraron usuarios en la base de datos.'
            });
        }

        // Si se agregaron usuarios correctamente
        res.status(200).json({
            message: 'Usuarios cargados y agregados exitosamente.',
            usuarios: usuariosAgregados
        });


    }catch (error) { 
        console.error('Error al cargar usuarios (controlador):', error.message); // Añadido para debug
        res.status(500).json({
            message: 'Error al cargar usuarios (controlador):',
            error: error.message
        });
    }

}
const iniciarSesion = async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        const response = await gestor.iniciarSesion(email, contrasena);
        
        // Aquí verificamos el código de estado devuelto por el gestor
        if (response.status === 200) {
            // Si el inicio de sesión es exitoso
            res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                usuario: response.user // Retorna el usuario
            });
        } else {
            // Para errores de autenticación
            return res.status(200).json({
                success: false,
                message: response.message // 'Correo electrónico incorrecto' o 'Contraseña incorrecta'
            });
        }
    } catch (error) {
        // En caso de un error en el servidor
        res.status(500).json({ 
            success: false,
            message: 'Error al iniciar sesión (controlador)',
            error });
    }
}


const registrarUsuario = async (req, res) => {
    const { email, contrasena,telefono,nombre } = req.body;

    try {
        const response = await gestor.registrarUsuario( nombre, email, contrasena, telefono);
        
        if (response.status === 200) {
            // Si el inicio de sesión es exitoso
            res.status(200).json({
                success: true,
                message: 'Registro exitoso',
                usuario: response.user // Retorna el usuario
            });
        } else {
            // Para errores de campos
            return res.status(200).json({
                success: false,
                message: response.message // 'Correo Existente' 'Telefono Existente'
            });
        }
    } catch (error) {
        // En caso de un error en el servidor
        res.status(500).json({ 
            success: false,
            message: 'Error al Registrar Usuario (controlador)',
            error });
    }
}



export { crearUsuario,cargarUsuarios,iniciarSesion,registrarUsuario};

