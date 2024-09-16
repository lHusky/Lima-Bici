import express from 'express';
import { crearUsuarioYPerfil } from '../controllers/controladores.js';

const userRouter = express.Router();

userRouter.post('/usuarios', crearUsuarioYPerfil);

userRouter.get('/test', (req, res) => {
    res.status(200).send('Ruta de prueba funcionando correctamente');
});

// Cambia `module.exports` a `export default`
export default userRouter;