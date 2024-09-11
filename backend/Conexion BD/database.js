import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getUsuarioByID(id) {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?',[id]);  // Aquí es donde corregimos el paso de parámetros
    return rows[0];
}

export async function getObjetivoByID(id) {
    const [row]= await pool.query('SELECT * FROM objetivo WHERE id= ?',[id] )
    return row[0];
}

export async function getRutaByID(id) {
    const [row]= await pool.query('SELECT * FROM ruta WHERE id= ?',[id] )
    return row[0];
}

export async function getPuntoInteresByID(id) {
    const [row]= await pool.query('SELECT * FROM punto_interes WHERE id= ?',[id] )
    return row[0];
}

export async function getPerfilLoginByID(id) {
    const [row]= await pool.query('SELECT * FROM perfil_Login WHERE id= ?',[id] )
    return row[0];
}
