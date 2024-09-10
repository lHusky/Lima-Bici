import express from "express";
import{

}from "./database.js";

const app= express();
app.use(express.json());

app.get("/todos/id", async(req,res)=>{
    const
})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
});
