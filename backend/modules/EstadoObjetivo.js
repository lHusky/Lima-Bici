import { pool } from '../database.js';

class EstadoObjetivo {
    constructor(id_estado_objetivo, titulo, progreso, completado) {
        this.id_estado_objetivo = id_estado_objetivo;
        this.titulo = titulo;
        this.progreso = progreso;
        this.completado = completado;
    }


    calcularProgreso() {

        if (this.completado) {
            this.progreso = "100%";
        } else {
            // Ejemplo básico: Si no está completado, se mantiene el progreso actual
            this.progreso = this.progreso || "0%"; 
        }
        return this.progreso;
    }


    getCompletado() {
        return this.completado;
    }

    setCompletado(completado) {
        this.completado = completado;
        this.calcularProgreso();  // Actualizamos el progreso según el estado de completado
    }

    getProgreso() {
        return this.progreso;
    }

    setProgreso(progreso) {
        this.progreso = progreso;
    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }
}

export default EstadoObjetivo;
