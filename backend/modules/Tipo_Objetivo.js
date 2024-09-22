
import { pool } from '../database.js';

class TipoObjetivo {
    constructor(id, titulo) {
        this.id = id;
        this.titulo = titulo;
    }

    static async crearTipoObjetivo(titulo) {
        try {
            const [result] = await pool.query(
                'INSERT INTO tipo_Objetivo (titulo) VALUES (?)',
                [titulo]
            );
            const tipoObjetivoID = result.insertId;
            return { id: tipoObjetivoID };
        } catch (error) {
            console.error('Error en la creación del tipo de objetivo:', error.message);
            throw error;
        }
    }

    static async obtenerTipoObjetivoPorId(id) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM tipo_Objetivo WHERE id = ?',
                [id]
            );
            if (rows.length > 0) {
                return new TipoObjetivo(rows[0].id, rows[0].titulo);
            } else {
                throw new Error('Tipo de objetivo no encontrado');
            }
        } catch (error) {
            console.error('Error obteniendo el tipo de objetivo:', error.message);
            throw error;
        }
    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }
}

export default TipoObjetivo;
