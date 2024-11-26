import express from 'express';
import {subirImagen
    // obtenerTodos,
    // obtenerPorID,
    // editar,
    // eliminarUno
} from '../controllers/gestorImagenes.js';

const gestorImagenesRouter = express.Router();

gestorImagenesRouter.post('/:tipo', subirImagen);

// gestorImagenesRouter.get('/punto/:id', obtenerPorIDPunto); //punto interes 

// gestorImagenesRouter.get('/usuario/:id', obtenerPorIDUsuario); //perfil

export {gestorImagenesRouter};