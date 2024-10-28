import express from 'express';
import { crearUsuario,cargarUsuarios,iniciarSesion,registrarUsuario} from '../controllers/controladores.js';

const gestionUserRouter = express.Router();

//RUTA: Registrar Usuario
gestionUserRouter.post('/gestionUsuario', crearUsuario);


gestionUserRouter.get('/gestionUsuario', cargarUsuarios);


gestionUserRouter.post('/gestionUsuario/iniciarSesion',iniciarSesion);


gestionUserRouter.post('/gestionUsuario/registrarUsuario',registrarUsuario);
// Cambia `module.exports` a `export default`
export {gestionUserRouter};
