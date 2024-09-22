import { pool } from '../database.js';

class RecuentoSesion {
    constructor(id, velocidadPromedio, caloriasQuemadas, kmRecorridosHoy, fechaInicio, fechaFin, usuario) {
        this.id = id;
        this.velocidadPromedio = velocidadPromedio;
        this.caloriasQuemadas = caloriasQuemadas;
        this.kmRecorridosHoy = kmRecorridosHoy;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.usuario = usuario;  // Asumimos que 'usuario' es una instancia de la clase Usuario
    }

    // Métodos para mostrar información
    mostrarCaloriasQuemadasHoy() {
        return `Calorías quemadas hoy: ${this.caloriasQuemadas}`;
    }

    mostrarVelocidadPromedio() {
        return `Velocidad promedio: ${this.velocidadPromedio} km/h`;
    }

    mostrarTotalKMRecorridosHoy() {
        return `Kilómetros recorridos hoy: ${this.kmRecorridosHoy} km`;
    }


    getVelocidadPromedio() {
        return this.velocidadPromedio;
    }

    setVelocidadPromedio(velocidadPromedio) {
        this.velocidadPromedio = velocidadPromedio;
    }

    getCaloriasQuemadas() {
        return this.caloriasQuemadas;
    }

    setCaloriasQuemadas(caloriasQuemadas) {
        this.caloriasQuemadas = caloriasQuemadas;
    }

    getKmRecorridosHoy() {
        return this.kmRecorridosHoy;
    }

    setKmRecorridosHoy(kmRecorridosHoy) {
        this.kmRecorridosHoy = kmRecorridosHoy;
    }

    getFechaInicio() {
        return this.fechaInicio;
    }

    setFechaInicio(fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    getFechaFin() {
        return this.fechaFin;
    }

    setFechaFin(fechaFin) {
        this.fechaFin = fechaFin;
    }

    getUsuario() {
        return this.usuario;
    }

    setUsuario(usuario) {
        this.usuario = usuario;  // Aquí debes pasar una instancia de la clase Usuario
    }
}

export default RecuentoSesion;
