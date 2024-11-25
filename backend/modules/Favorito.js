// modules/Favorito.js
import db from '../database.js';

class Favorito {
    constructor(id, userId, rutaId, puntoInteresId, descripcion, fechaAgregado) {
        this.id = id;
        this.userId = userId;
        this.rutaId = rutaId;
        this.puntoInteresId = puntoInteresId;
        this.descripcion = descripcion;
        this.fechaAgregado = fechaAgregado;
    }

    // Método para agregar un favorito
    static async agregarFavoritoRuta(userId, rutaId, descripcion = '') {
        const fechaAgregado = new Date();
        const [result] = await db.query(`
            INSERT INTO favoritos (fecha_agregado, descripcion, id_usuario, id_ruta)
            VALUES (?, ?, ?, ?)
        `, [fechaAgregado, descripcion, userId, rutaId]);

        return result.insertId;
    }

    // Método para eliminar un favorito
    static async eliminarFavoritoRuta(userId, rutaId) {
        await db.query(`
            DELETE FROM favoritos WHERE id_usuario = ? AND id_ruta = ?
        `, [userId, rutaId]);
    }

    // Método para verificar si existe un favorito
    static async existeFavoritoRuta(userId, rutaId) {
        const [rows] = await db.query(`
            SELECT id FROM favoritos WHERE id_usuario = ? AND id_ruta = ?
        `, [userId, rutaId]);
        return rows.length > 0;
    }
}

export default Favorito;
