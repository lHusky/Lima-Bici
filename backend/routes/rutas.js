import express from 'express';
import { crearUsuario} from '../controllers/controladores.js';

const userRouter = express.Router();

userRouter.get('/gestionUsuario', crearUsuario);

userRouter.get('/test', (req, res) => {
    res.status(200).send('Ruta de prueba funcionando correctamente');
});

// Cambia `module.exports` a `export default`
export default userRouter;
