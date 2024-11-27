import express from 'express';
import { crearUsuario,
    cargarUsuarios,
    iniciarSesion,
    registrarUsuario, 
    crearCodVerificacion, 
    cargarCodVerificacion, 
    actualizarContraseña, 
    editarUsuario,
    obtenerUsuarioPorID,
    eliminarUsuario,
    AdmieditarUsuario } from '../controllers/gestionUsuario.js';

const gestionUserRouter = express.Router();

//RUTA: Registrar Usuario
gestionUserRouter.post('/', crearUsuario);

gestionUserRouter.get('/', cargarUsuarios);

gestionUserRouter.get('/:id', obtenerUsuarioPorID);

gestionUserRouter.post('/iniciarSesion',iniciarSesion);

gestionUserRouter.post('/registrarUsuario',registrarUsuario);

gestionUserRouter.post('/crearVerCodigo', crearCodVerificacion);

gestionUserRouter.post('/findVerCodigo', cargarCodVerificacion);

gestionUserRouter.put('/updateContrasena', actualizarContraseña);

gestionUserRouter.put('/:id',  editarUsuario);

gestionUserRouter.put('/admin/:id', AdmieditarUsuario);

gestionUserRouter.delete('/:id', eliminarUsuario);

export {gestionUserRouter};
