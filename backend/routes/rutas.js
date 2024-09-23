import express from 'express';
import { crearUsuario,cargarUsuarios} from '../controllers/controladores.js';

const gestionUserRouter = express.Router();

//RUTA: Registrar Usuario
gestionUserRouter.post('/gestionUsuario', crearUsuario);


gestionUserRouter.get('/gestionUsuario', cargarUsuarios);



 

// Cambia `module.exports` a `export default`
export {gestionUserRouter};
