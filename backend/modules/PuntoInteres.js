import Coordenada from './Coordenada.js';
import { pool } from '../database.js';

class PuntoInteres {
    constructor(id, id_creador , titulo, img_referencial='', horario,direccion, descripcion, id_tipo,latitud,longitud) {
        // if (!id || !id_creador || !titulo || !direccion || !descripcion || !id_tipo || !latitud || !longitud) {
        //     throw new Error("Falta completar los campos obligatorios.");
        // }
        
        this.id = id;
        this.id_creador = id_creador;
        this.titulo = titulo;
        this.img_referencial = img_referencial;
        this.horario = horario;
        this.direccion = direccion;
        this.descripcion = descripcion;
        this.id_tipo = id_tipo;
        this.ubicacion=new Coordenada(latitud, longitud);
    }

    async agregarPuntoInteresBD(id_creador, titulo, img_referencial='', horario='',direccion='', descripcion='', id_tipo,latitud,longitud) {
        try {
            const [result] = await pool.execute(   
                'INSERT INTO punto_interes (titulo, horario, img_referencial, direccion,descripcion,id_coordenada,id_tipo) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [titulo, horario, img_referencial, direccion,descripcion,id_coordenada,id_tipo]
            );
    
                
            const itemID = result.insertId;
            this.setId(itemID);
            return this;
        } catch (error) {
            console.error('Error en la creación del punto interes (modulo):', error.message);
            throw error;
        } 
    }

    async buscarPuntoInteres(nombre, email, telefono, contrasena) {
        try {
            const [result] = await pool.execute(   
                'INSERT INTO punto_interes (nombre, email, telefono, contrasena) VALUES (?, ?, ?, ?)',
                [nombre, email, telefono, contrasena]
            );
            const usuarioID = result.insertId;
            this.setId(usuarioID);
            return this;
        } catch (error) {
            console.error('Error en la creación del usuario:', error.message);
            throw error;
        } 
    }
    
    async eliminarPuntoInteresBD(id) {
        try {

            //buscar para obtener id
            const [result] = await pool.execute(   
                'DELETE FROM punto_interes WHERE id = ?',
                [id]
            );
            const itemID = result.insertId;
            this.setId(itemID);
            return this;
        } catch (error) {
            console.error('Error al eliminar del usuario:', error.message);
            throw error;
        }

    }


    // Getter y Setter para id
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    // Getter y Setter para id_creador
    getIdCreador() {
        return this.id_creador;
    }

    setIdCreador(id_creador) {
        this.id_creador = id_creador;
    }

    // Getter y Setter para titulo
    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }

    // Getter y Setter para img_referencial
    getImgReferencial() {
        return this.img_referencial;
    }

    setImgReferencial(img_referencial) {
        this.img_referencial = img_referencial;
    }

    // Getter y Setter para direccion
    getDireccion() {
        return this.direccion;
    }

    setDireccion(direccion) {
        this.direccion = direccion;
    }

    // Getter y Setter para descripcion
    getDescripcion() {
        return this.descripcion;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    // Getter y Setter para id_tipo
    getIdTipo() {
        return this.id_tipo;
    }

    setIdTipo(id_tipo) {
        this.id_tipo = id_tipo;
    }

    // Getter y Setter para ubicacion (latitud y longitud)
    getUbicacion() {
        return this.ubicacion;
    }

    setUbicacion(latitud, longitud) {
        this.ubicacion = new Coordenada(latitud, longitud);
    }
}

export default PuntoInteres;
