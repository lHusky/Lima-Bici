import express from 'express';
import { crearUsuario,
    cargarUsuarios,
    iniciarSesion,
    registrarUsuario, 
    crearCodVerificacion, 
    cargarCodVerificacion, 
    actualizarContraseña, 
    editarUsuario,
    obtenerUsuarioPorID} from '../controllers/gestionUsuario.js';

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

export {gestionUserRouter};
