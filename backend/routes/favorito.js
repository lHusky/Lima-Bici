import express from 'express';
import { obtenerFavoritas, toggleFavoritoRuta } from '../controllers/favoritoController.js';

const favoritoRouter = express.Router();

favoritoRouter.post('/favorito/toggle', toggleFavoritoRuta);
favoritoRouter.get('/favorito/:id_usuario', obtenerFavoritas); // Nueva ruta para rutas favoritas

export default favoritoRouter;
