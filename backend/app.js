import express from 'express';
import {gestionUserRouter} from './routes/rutas.js'; // Asegúrate de que esta ruta es correcta
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
app.use("/api", gestionUserRouter);

app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on port 3000");
});








// Ruta existente para obtener un usuario por ID
// app.get("/usuario/:id", async (req, res) => {
//     const usuario = await getUsuarioByID(req.params.id);
//     res.status(200).send(usuario);
// });
