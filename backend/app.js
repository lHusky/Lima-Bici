import express from 'express';
import {gestionUserRouter} from './routes/gestionUsuario.js'; // Asegúrate de que esta ruta es correcta
import {puntoInteresRouter} from './routes/puntoInteres.js';
import {tipoPuntoInteresRouter} from './routes/tipoPuntoInteres.js';
import {gestorImagenesRouter} from './routes/gestorImagenes.js';

import rutaRouter from './routes/rutas.js'; // Ajusta la ruta según tu estructura de archivos
import favoritoRouter from './routes/favorito.js';

import GestionUsuario from './modules/GestionUsuario.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*', 
}));
// Permite todas las solicitudes. Cambia a dominios específicos si es necesario.
export const gestor = new GestionUsuario();

// Usar las rutas del router importado
app.use("/gestionUsuario", gestionUserRouter);

app.use("/puntoInteres", puntoInteresRouter);

app.use("/tipoPuntoInteres", tipoPuntoInteresRouter);

app.use("/gestorImagenes", gestorImagenesRouter);

app.use('/api', favoritoRouter);

app.use('/api', rutaRouter);

app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on port 3000");
});
