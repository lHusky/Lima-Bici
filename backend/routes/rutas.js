// const express = require('express');

// import { Router } from 'express';
// import { crearUsuarioYPerfil } from '../controllers/controladores.js';

const { Router } = require('express');
const { crearUsuarioYPerfil } = require('../controllers/controladores.js');


const userRouter = express.Router();

userRouter.post('/usuarios', crearUsuarioYPerfil);

module.exports = userRouter;
