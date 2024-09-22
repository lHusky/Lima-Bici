import { pool } from '../database.js';

class UsuarioObjetivos {
    constructor(id, fechaFin, fechaInicio, duracion, id_usuario, id_objetivo, id_estado_objetivo) {
        this.id = id;
        this.fechaFin = fechaFin;
        this.fechaInicio = fechaInicio;
        this.duracion = duracion;
        this.id_usuario = id_usuario;
        this.id_objetivo = id_objetivo;
        this.id_estado_objetivo = id_estado_objetivo;
    }

    static async obtenerMetasMes(id_usuario, mes, año) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM usuario_objetivos WHERE id_usuario = ? AND MONTH(fechaInicio) = ? AND YEAR(fechaInicio) = ?',
                [id_usuario, mes, año]
            );
            return rows;
        } catch (error) {
            console.error('Error obteniendo las metas del mes:', error.message);
            throw error;
        }
    }

    static async guardarMetasMes(id_usuario, metas) {
        try {
            const insertValues = metas.map(meta => [
                meta.fechaFin,
                meta.fechaInicio,
                meta.duracion,
                id_usuario,
                meta.id_objetivo,
                meta.id_estado_objetivo,
            ]);

            await pool.query(
                'INSERT INTO usuario_objetivos (fechaFin, fechaInicio, duracion, id_usuario, id_objetivo, id_estado_objetivo) VALUES ?',
                [insertValues]
            );
            return { message: 'Metas guardadas exitosamente' };
        } catch (error) {
            console.error('Error guardando las metas del mes:', error.message);
            throw error;
        }
    }

    static async guardarNuevaMeta(fechaFin, fechaInicio, duracion, id_usuario, id_objetivo, id_estado_objetivo) {
        try {
            await pool.query(
                'INSERT INTO usuario_objetivos (fechaFin, fechaInicio, duracion, id_usuario, id_objetivo, id_estado_objetivo) VALUES (?, ?, ?, ?, ?, ?)',
                [fechaFin, fechaInicio, duracion, id_usuario, id_objetivo, id_estado_objetivo]
            );
            return { message: 'Nueva meta guardada exitosamente' };
        } catch (error) {
            console.error('Error guardando la nueva meta:', error.message);
            throw error;
        }
    }

    static async guardarListaMetasMes(metas) {
        try {
            const insertValues = metas.map(meta => [
                meta.fechaFin,
                meta.fechaInicio,
                meta.duracion,
                meta.id_usuario,
                meta.id_objetivo,
                meta.id_estado_objetivo,
            ]);

            await pool.query(
                'INSERT INTO usuario_objetivos (fechaFin, fechaInicio, duracion, id_usuario, id_objetivo, id_estado_objetivo) VALUES ?',
                [insertValues]
            );
            return { message: 'Lista de metas guardada exitosamente' };
        } catch (error) {
            console.error('Error guardando la lista de metas:', error.message);
            throw error;
        }
    }

    getFechaFin() {
        return this.fechaFin;
    }

    setFechaFin(fechaFin) {
        this.fechaFin = fechaFin;
    }

    getFechaInicio() {
        return this.fechaInicio;
    }

    setFechaInicio(fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    getDuracion() {
        return this.duracion;
    }

    setDuracion(duracion) {
        this.duracion = duracion;
    }

    getIdUsuario() {
        return this.id_usuario;
    }

    setIdUsuario(id_usuario) {
        this.id_usuario = id_usuario;
    }

    getIdObjetivo() {
        return this.id_objetivo;
    }

    setIdObjetivo(id_objetivo) {
        this.id_objetivo = id_objetivo;
    }

    getIdEstadoObjetivo() {
        return this.id_estado_objetivo;
    }

    setIdEstadoObjetivo(id_estado_objetivo) {
        this.id_estado_objetivo = id_estado_objetivo;
    }
}

export default UsuarioObjetivos;
