import express from 'express';
import {gestionUserRouter} from './routes/rutas.js'; // Asegúrate de que esta ruta es correcta
import { getUsuarioByID } from './database.js'; // Ajusta la ruta según sea necesario
import GestionUsuario from './modules/GestionUsuario.js';

const app = express();
app.use(express.json());
export const gestor = new GestionUsuario();

// Usar las rutas del router importado
app.use("/api", gestionUserRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});








// Ruta existente para obtener un usuario por ID
// app.get("/usuario/:id", async (req, res) => {
//     const usuario = await getUsuarioByID(req.params.id);
//     res.status(200).send(usuario);
// });