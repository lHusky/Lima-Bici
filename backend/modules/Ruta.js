// Ruta.js
import Coordenada from './Coordenada.js';

class Ruta {
    constructor(id_ruta, duracion, distancia, puntoInicioLatitud, puntoFinalLatitud, puntoInicioLongitud, puntoFinalLongitud, descripcion) {
        this.id_ruta = id_ruta;
        this.duracion = duracion;
        this.distancia = distancia;
        this.puntoInicioLatitud = puntoInicioLatitud;
        this.puntoFinalLatitud = puntoFinalLatitud;
        this.puntoInicioLongitud = puntoInicioLongitud;
        this.puntoFinalLongitud = puntoFinalLongitud;
        this.descripcion = descripcion;
        this.coordenadas = [];  // Array para almacenar coordenadas
    }

    // Método para crear una ruta con un conjunto de coordenadas
    crearRuta(coordenadas) {
        if (Array.isArray(coordenadas) && coordenadas.every(coord => coord instanceof Coordenada)) {
            this.coordenadas = coordenadas;
        } else {
            throw new Error("Las coordenadas deben ser un array de instancias de Coordenada");
        }
    }

    // Getters y Setters para los atributos de la ruta
    getIdRuta() {
        return this.id_ruta;
    }

    setIdRuta(id_ruta) {
        this.id_ruta = id_ruta;
    }

    getDuracion() {
        return this.duracion;
    }

    setDuracion(duracion) {
        this.duracion = duracion;
    }

    getDistancia() {
        return this.distancia;
    }

    setDistancia(distancia) {
        this.distancia = distancia;
    }

    getPuntoInicioLatitud() {
        return this.puntoInicioLatitud;
    }

    setPuntoInicioLatitud(latitud) {
        this.puntoInicioLatitud = latitud;
    }

    getPuntoFinalLatitud() {
        return this.puntoFinalLatitud;
    }

    setPuntoFinalLatitud(latitud) {
        this.puntoFinalLatitud = latitud;
    }

    getPuntoInicioLongitud() {
        return this.puntoInicioLongitud;
    }

    setPuntoInicioLongitud(longitud) {
        this.puntoInicioLongitud = longitud;
    }

    getPuntoFinalLongitud() {
        return this.puntoFinalLongitud;
    }

    setPuntoFinalLongitud(longitud) {
        this.puntoFinalLongitud = longitud;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    // Obtener la lista de coordenadas de la ruta
    getCoordenadas() {
        return this.coordenadas;
    }

    // Método para mostrar información de la ruta
    mostrarRuta() {
        return `Ruta ${this.id_ruta}: Duración ${this.duracion} mins, Distancia ${this.distancia} km, Descripción: ${this.descripcion}`;
    }
}

export default Ruta;
