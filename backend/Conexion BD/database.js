import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql  //conexion con nuestra base de datos
.createPool({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})
.promise();

export async function getTodoByID(id){
    const [row]= await pool.query('SELECT * FROM todos WHERE id= ?'[id] )
    return row[0];
}
