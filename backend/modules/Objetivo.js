import { pool } from '../database.js';

class Objetivo {
    constructor(id, titulo, id_tipo) {
        this.id = id;
        this.titulo = titulo;
        this.id_tipo = id_tipo;
    }

    static async crearObjetivo(titulo, id_tipo) {
        try {
            const [result] = await pool.query(
                'INSERT INTO objetivo (titulo, id_tipo) VALUES (?, ?)',
                [titulo, id_tipo]
            );
            const objetivoID = result.insertId;
            return { id: objetivoID };
        } catch (error) {
            console.error('Error en la creación del objetivo:', error.message);
            throw error;
        }
    }

    static async obtenerObjetivoPorId(id) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM objetivo WHERE id = ?',
                [id]
            );
            if (rows.length > 0) {
                return new Objetivo(rows[0].id, rows[0].titulo, rows[0].id_tipo);
            } else {
                throw new Error('Objetivo no encontrado');
            }
        } catch (error) {
            console.error('Error obteniendo el objetivo:', error.message);
            throw error;
        }
    }

    static async actualizarObjetivo(id, titulo, id_tipo) {
        try {
            await pool.query(
                'UPDATE objetivo SET titulo = ?, id_tipo = ? WHERE id = ?',
                [titulo, id_tipo, id]
            );
            return { message: 'Objetivo actualizado exitosamente' };
        } catch (error) {
            console.error('Error actualizando el objetivo:', error.message);
            throw error;
        }
    }

    static async eliminarObjetivo(id) {
        try {
            await pool.query(
                'DELETE FROM objetivo WHERE id = ?',
                [id]
            );
            return { message: 'Objetivo eliminado exitosamente' };
        } catch (error) {
            console.error('Error eliminando el objetivo:', error.message);
            throw error;
        }
    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }

    getIdTipo() {
        return this.id_tipo;
    }

    setIdTipo(id_tipo) {
        this.id_tipo = id_tipo;
    }
}

export default Objetivo;
