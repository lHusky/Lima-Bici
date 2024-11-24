import express from 'express';
import {crearUno,
    obtenerTodos,
    obtenerPorID,
    editar,
    eliminarUno
} from '../controllers/tipoPuntoInteres.js';

const tipoPuntoInteresRouter = express.Router();

tipoPuntoInteresRouter.post('/', crearUno);

tipoPuntoInteresRouter.get('/', obtenerTodos);

tipoPuntoInteresRouter.get('/:id', obtenerPorID);

tipoPuntoInteresRouter.put('/:id', editar);

tipoPuntoInteresRouter.delete('/:id',  eliminarUno);

export {tipoPuntoInteresRouter};