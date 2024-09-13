

// CREAR USUARIO - POST
const express = require('express');

const { crearUsuario } = require('../controllers/controladores');
const router = express.Router();

router.post('/usuarios', crearUsuario);
module.exports = router;