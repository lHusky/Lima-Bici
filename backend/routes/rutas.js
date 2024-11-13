import express from 'express';
import { crearUsuario,cargarUsuarios,iniciarSesion,registrarUsuario, crearCodVerificacion, cargarCodVerificacion, actualizarContraseña, editarUsuario} from '../controllers/controladores.js';

const gestionUserRouter = express.Router();

//RUTA: Registrar Usuario
gestionUserRouter.post('/gestionUsuario', crearUsuario);


gestionUserRouter.get('/gestionUsuario', cargarUsuarios);

// gestionUserRouter.get('/gestionUsuario/:id', obtenerUsuarioPorID);


gestionUserRouter.post('/gestionUsuario/iniciarSesion',iniciarSesion);


gestionUserRouter.post('/gestionUsuario/registrarUsuario',registrarUsuario);

gestionUserRouter.post('/gestionUsuario/crearVerCodigo', crearCodVerificacion);

gestionUserRouter.post('/gestionUsuario/findVerCodigo', cargarCodVerificacion);

gestionUserRouter.put('/gestionUsuario/updateContrasena', actualizarContraseña);

// Cambia `module.exports` a `export default`

gestionUserRouter.put('/gestionUsuario/editarUsuario',  editarUsuario);


export {gestionUserRouter};
