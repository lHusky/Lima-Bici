//Utilidad:
    // Se crearán todas las rutas / controladores que sirven para las consultas el frontend con el backend
//Averiguar:
    // Definicion y estructura de las rutas / controladores   X 
                // Ruta: app.get("/usuario/:id", ...)
                // Controlador: async(req, res) => {...}



import express, { json } from "express";
import{
    getObjetivoByID,
    getPerfilLoginByID,
    getPuntoInteresByID,
    getRutaByID,
    getUsuarioByID
}from "./database.js";  //clases.js

const app= express();
app.use(express.json());

// ruta + controlador

//CLASE:
app.get("/usuario/:id", async(req,res)=>{
    const usuario = await getUsuarioByID(req.params.id);
    res.status(200).send(usuario);
});

app.listen(3000,()=>{
    console.log("Server running on port 3000")
});
 
