import express, { json } from "express";
import{
    getObjetivoByID,
    getPerfilLoginByID,
    getPuntoInteresByID,
    getRutaByID,
    getUsuarioByID
}from "./database.js";

const app= express();
app.use(express.json());

app.get("/usuario/:id", async(req,res)=>{
    const usuario = await getUsuarioByID(req.params.id);
    res.status(200).send(usuario);
});

app.listen(3000,()=>{
    console.log("Server running on port 3000")
});
 
