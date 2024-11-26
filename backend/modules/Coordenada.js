import { pool } from '../database.js';

class Coordenada {
    constructor(id, orden, latitud, longitud,id_ruta=null,id_punto_interes=null) {
        this.id=id;
        this.orden = orden;
        this.latitud = latitud;
        this.longitud = longitud;
        this.id_ruta = id_ruta;
        this.id_punto_interes = id_punto_interes;
    }


    async agregarCoordenadaPuntoBD() {
        try {
            const [result] = await pool.execute(   
                `INSERT INTO coordenada(orden,latitud,longitud,id_ruta,id_punto_interes) 
                VALUES (?,?,?,?,?)`,
                [this.orden,this.latitud,this.longitud,null,this.id_punto_interes]
            );

            const itemID = result.insertId;
            this.setId(itemID);
            return this;
        } catch (error) {
            console.error('Error en la creación de punto interes - punto (modulo):', error.message);
            throw error;
        } 
    }
    //debe repetirse por cada coordenada con un map en el controlador o algo
    async agregarCoordenadaRutaBD() {
        try {
            const [result] = await pool.execute(   
                `INSERT INTO coordenada(orden,latitud,longitud,id_ruta,id_punto_interes) 
                VALUES (?,?,?,?,?)`,
                [this.orden,this.latitud,this.longitud,this.id_ruta,null]
            );

            const itemID = result.insertId;
            this.setId(itemID);
            return this;
        } catch (error) {
            console.error('Error en la creación de punto interes - ruta (modulo):', error.message);
            throw error;
        } 
    }

    static async obtenerCoordenadasPorPuntoInteres(idPuntoInteres) {
        
        const [result] = await pool.execute(
            `SELECT latitud, longitud FROM coordenada WHERE id_punto_interes = ?`, [idPuntoInteres]);
        return result;
    };

    static async obtenerCoordenadasPorRuta(idRuta) {
        
        const [result] = await pool.execute(
            `SELECT latitud, longitud FROM coordenada WHERE id_ruta = ?`, [idRuta]);
        return result;
    };

    static async eliminarCoordenadaPorPuntoInteres(idPuntoInteres) {
        
        const [result] = await pool.execute(
            `DELETE FROM coordenada WHERE id_punto_interes = ?`, [idPuntoInteres]);

        if (result.affectedRows === 0) {
            console.log(`No se encontró la coordenada`);
            return false; 
        }
        return result;
    };

    static async eliminarCoordenadasPorRuta(idRuta) {
        
        const [result] = await pool.execute(
            `DELETE FROM coordenada WHERE id_ruta = ?`, [idRuta]);
        if (result.affectedRows === 0) {
            console.log(`No se encontró la coordenada`);
            return false; 
        }
        return result;
    };

    setId(id){
        this.id=id;
    }

    getId(){
        return this.id;
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
