import express from 'express';
import {
    crearRuta,
    obtenerRutasUsuario,
    obtenerRutaPorId,
    obtenerTodasLasRutas,
    actualizarRuta,
    obtenerCoordenadasRuta 
} from '../controllers/controladorRutas.js'; // Asegúrate de que el path sea correcto

const rutaRouter = express.Router();

// Endpoint para crear una ruta
rutaRouter.post('/ruta', crearRuta);

// Endpoint para obtener las últimas 4 rutas
rutaRouter.get('/ruta', obtenerTodasLasRutas);

// Otros endpoints
rutaRouter.get('/ruta/usuario/:userId', obtenerRutasUsuario);
rutaRouter.get('/ruta/:id', obtenerRutaPorId); // Configura la ruta correctamente
rutaRouter.put('/ruta/:id_ruta', actualizarRuta);

rutaRouter.get('/ruta/:id_ruta/coordenadas', obtenerCoordenadasRuta);


export default rutaRouter;
