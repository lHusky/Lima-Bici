const express = require('express');
const { crearUsuario } = require('../controllers/controladores');
const router = express.Router();

// CREAR USUARIO - POST

router.post('/usuarios', crearUsuario);
module.exports = router;