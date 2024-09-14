// CrearPerfil con ID_Usuario
// import Usuario from '../modules/clases/Usuario.js'; 
// import Perfil_Login from '../modules/clases/Perfil_Login.js';
const Usuario = require('../modules/clases/Usuario');
const Perfil_Login = require('../modules/clases/Perfil_Login');
// Uniendo 
const crearUsuarioYPerfil = async (req, res) => {
    const { nombre, email, telefono, contrasena } = req.body;

    try {
        // Crear usuario y obtener id_usuario
        const { id: usuarioID } = await Usuario.crearUsuario(nombre, email, telefono);

        // Crear perfil asociado al id_usuario
        await Perfil_Login.crearPerfil(usuarioID, contrasena, email);

        // Éxito - aprobacion de creacion de objeto
        res.status(201).json({
            message: 'Usuario y perfil creados exitosamente',
            usuarioID
        });
    } catch (error) {
        console.error('Error al crear el usuario y perfil:', error.message); // Añadido para debug
        res.status(500).json({
            message: 'Error al crear el usuario y perfil',
            error: error.message
        }); // errores pueden ser mejor detallados
    }
};
  
module.exports = {
    crearUsuarioYPerfil
};

