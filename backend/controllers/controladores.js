
// CLASE USUARIO - Crear Usuario
const express = require("../modules/clases.js")


const createUsuario = (req,res) => {
    const {nombre, email, contrasena,telefono} = req.body;
    const nuevoUsuario = Usurio.createUsuario({nombre, email, contrasena,telefono})
    res.status(201).json(nuevoUsuario);
}