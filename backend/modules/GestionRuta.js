// src/models/GestionRuta.js

import db from '../database.js';

class GestionRuta {
    async crearRuta(data) {
        const { userId, nombre, descripcion, duracion, distancia, fechaInicio, fechaFin, horaInicio, horaFin, coordenadas } = data;

        const [result] = await db.query(`
            INSERT INTO ruta (id_creador, nombre, descripcion, duracion, distancia, fechaInicio, fechaFin, horaInicio, horaFin)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [userId, nombre, descripcion, duracion, distancia, fechaInicio, fechaFin, horaInicio, horaFin]);

        const rutaId = result.insertId;

        for (const coord of coordenadas) {
            await db.query(`
                INSERT INTO coordenada (id_ruta, latitud, longitud)
                VALUES (?, ?, ?)
            `, [rutaId, coord.latitud, coord.longitud]);
        }

        return { rutaId };
    }

    static async obtenerRutasPorUsuario(userId) {
        const [rows] = await db.query(`
            SELECT * FROM ruta WHERE id_creador = ?
        `, [userId]);
        return rows;
    }
    

    static async obtenerRutaPorId(id_ruta) {
        const [rows] = await db.query(`
            SELECT * FROM ruta WHERE id = ?
        `, [id_ruta]);
        return rows[0];
    }
    
}

export default GestionRuta;
