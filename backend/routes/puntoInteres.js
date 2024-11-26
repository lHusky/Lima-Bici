import express from 'express';
import {crearUno,
    obtenerTodos,
    obtenerPorID,
    obtenerPorUsuario,
    obtenerPorTipo,
    editar,
    eliminarUno
} from '../controllers/puntoInteres.js';

const puntoInteresRouter = express.Router();

puntoInteresRouter.post('/', crearUno);

puntoInteresRouter.get('/', obtenerTodos);

puntoInteresRouter.get('/:id', obtenerPorID);

puntoInteresRouter.get('/us/:id', obtenerPorUsuario);

puntoInteresRouter.get('/tipo/:id', obtenerPorTipo);

puntoInteresRouter.put('/:id',  editar);

puntoInteresRouter.delete('/:id',  eliminarUno);

export {puntoInteresRouter};