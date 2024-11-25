import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();


export const pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        //charset: "utf8mb4", // Soporte utf8mb4 para emojis y caracteres especiales
    })
    .promise();
export default pool;

export async function agregarFavorito(userId, rutaId = null, puntoInteresId = null, descripcion) {
    const fechaAgregado = new Date();
    const [result] = await pool.query(
        `
        INSERT INTO favoritos (id_usuario, id_ruta, id_punto_interes, descripcion, fecha_agregado)
        VALUES (?, ?, ?, ?, ?)
        `,
        [userId, rutaId, puntoInteresId, descripcion, fechaAgregado]
    );
    return result.insertId;
}
