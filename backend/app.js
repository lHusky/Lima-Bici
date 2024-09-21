import express from 'express';
import userRouter from './routes/rutas.js'; // Asegúrate de que esta ruta es correcta
import { getUsuarioByID } from './database.js'; // Ajusta la ruta según sea necesario
import GestionUsuario from './modules/GestionUsuario.js';

const app = express();
app.use(express.json());
export const gestor = new GestionUsuario();

// Ruta existente para obtener un usuario por ID
app.get("/usuario/:id", async (req, res) => {
    const usuario = await getUsuarioByID(req.params.id);
    res.status(200).send(usuario);
});

// Usar las rutas del router importado, incluyendo la ruta de prueba "/test"
app.use("/api", userRouter);
// Aca ya importamos todas las rutas de Rutas.js, si en el navegador ponemos http://localhost:3000/api/test, nos movera a la ruta

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
