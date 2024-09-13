
// CLASE USUARIO - Crear Usuario
const express = require("../modules/clases");


const crearUsuario = (req,res) => {
    const {nombre, email, contrasena,telefono} = req.body;
    const nuevoUsuario = Usurio.crearUsuario({nombre, email, contrasena,telefono})
    res.status(201).json(nuevoUsuario);
}

module.exports= {crearUsuario};