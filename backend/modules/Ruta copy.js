// src/models/Ruta.js

import db from '../database.js';

class Ruta {
    constructor(id, userId, nombre, descripcion, duracion, distancia, fechaInicio, fechaFin, horaInicio, horaFin, coordenadas) {
        this.id = id;
        this.userId = userId;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.distancia = distancia;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.coordenadas = coordenadas;
    }

    async guardarRuta() {
        const [result] = await db.query(`
            INSERT INTO ruta (duracion, distancia, descripcion, id_creador, fechaInicio, fechaFin, horaInicio, horaFin)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [this.duracion, this.distancia, this.descripcion, this.userId, this.fechaInicio, this.fechaFin, this.horaInicio, this.horaFin]);

        this.id = result.insertId;

        for (let i = 0; i < this.coordenadas.length; i++) {
            const { latitud, longitud } = this.coordenadas[i];
            await db.query(`
                INSERT INTO coordenada (orden, latitud, longitud, id_ruta)
                VALUES (?, ?, ?, ?)
            `, [i, latitud, longitud, this.id]);
        }

        return this;
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

export default Ruta;
