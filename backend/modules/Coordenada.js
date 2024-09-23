
class Coordenada {
    constructor(orden, latitud, longitud) {
        this.orden = orden;
        this.latitud = latitud;
        this.longitud = longitud;
    }

    // Getters y Setters
    getOrden() {
        return this.orden;
    }

    setOrden(orden) {
        this.orden = orden;
    }

    getLatitud() {
        return this.latitud;
    }

    setLatitud(latitud) {
        this.latitud = latitud;
    }

    getLongitud() {
        return this.longitud;
    }

    setLongitud(longitud) {
        this.longitud = longitud;
    }

    // Método para mostrar coordenadas en formato string
    mostrarCoordenada() {
        return `Orden: ${this.orden}, Latitud: ${this.latitud}, Longitud: ${this.longitud}`;
    }
}

export default Coordenada;
