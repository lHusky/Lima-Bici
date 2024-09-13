// CrearPerfil con ID_Usuario

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

        // Éxito
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


// CLASE PERFIL_LOGIN - Crear Usuario
//const express = require("../modules/clases");


//const crearUsuario = (req,res) => {
    //const {nombre, email, contrasena,telefono} = req.body;
    //const nuevoUsuario = Usurio.crearUsuario({nombre, email, contrasena,telefono})
    
    //res.status(201).json(nuevoUsuario);
//}

//module.exports= {crearUsuario};


