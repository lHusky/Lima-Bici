import Coordenada from './Coordenada.js';
import { pool } from '../database.js';

class PuntoInteres {
    constructor(id, id_creador , titulo, img_referencial=null, horario=null,direccion, descripcion=null, id_tipo) {
     
        this.id = id;
        this.id_creador = id_creador;
        this.titulo = titulo;
        this.img_referencial = img_referencial;
        this.horario = horario;
        this.direccion = direccion;
        this.descripcion = descripcion;
        this.id_tipo = id_tipo;
    }

    async agregarPuntoInteresBD() {
        try {
            const [result] = await pool.execute(   
                `INSERT INTO punto_interes 
                (titulo, horario, img_referencial, direccion,descripcion,id_tipo,id_creador) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [this.titulo,         
                    this.horario,
                    this.img_referencial,
                    this.direccion,
                    this.descripcion,
                    this.id_tipo,
                    this.id_creador]
            );

            const itemID = result.insertId;
            this.setId(itemID);
            return this;
        } catch (error) {
            console.error('Error en la creación del punto interes (modulo):', error.message);
            throw error;
        } 
    }

    
    static async obtenerPuntosInteresBD() {
      
        try {
                const [PuntoInteres] = await pool.execute('SELECT * FROM punto_interes');
                if (PuntoInteres.length === 0) {
                    console.log("No se encontraron puntos en la base de datos.");
                return null;
                }
                
                return PuntoInteres;
        } catch (error) {
            if (error.code === 'ER_BAD_DB_ERROR') {
                console.error("Error: La base de datos no existe.");
            } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
                console.error("Error: Acceso denegado a la base de datos.");
            } else if (error.code === 'ER_SYNTAX_ERROR') {
                console.error("Error: Error de sintaxis en la consulta.");
            } else {
                console.error("Error al cargar punto interes desde la base de datos (modules)):", error);
            }
            throw error; 
        } 
    };
    

    static async obtenerPuntosPorID(id) {
        try {
            const [PuntoInteres] = await pool.execute(
                'SELECT id, titulo FROM punto_interes WHERE id = ?',
                [id]
            );
            if (PuntoInteres.length === 0) {
                console.log(`No se encontró un punto interes con el ID: ${id}`);
                return null; 
            }
            const ubicacion = Coordenada.obtenerCoordenadasPorPuntoInteres(id)
            
            console.log(`Punto interes encontrado con ID: ${id}`, PuntoInteres[0]);
            return PuntoInteres[0]; // Devuelve el primer (y único) resultado
        } catch (error) {
            console.error('Error al obtener el punto interes en la base de datos:', error);
            throw error; 
        }
    }
    
    static async obtenerPuntosPorUsuario(id) {
        try {
            const [PuntoInteres] = await pool.execute(
                'SELECT * FROM punto_interes WHERE id_creador IN (? , ?)',
                [id,1]
            );
            if (PuntoInteres.length === 0) {
                console.log(`No se encontró un punto interes con el ID de creador: ${id}`);
                return null; 
            }
            console.log(`Punto interes encontrado con ID: ${id}`, PuntoInteres);
            return PuntoInteres; // Devuelve el primer (y único) resultado
        } catch (error) {
            console.error('Error al obtener el punto interes en la base de datos:', error);
            throw error; 
        }
    }
    
    static async obtenerPuntosPorTipo(id_Usuario,id_tipo) {
        try {
            const [PuntoInteres] = await pool.execute(
                'SELECT id, titulo FROM punto_interes WHERE id_creador IN (? , ?) AND id_tipo IN (?)',
                [id_Usuario,1,id_tipo]
            );
            if (PuntoInteres.length === 0) {
                console.log(`No se encontró un punto interes con el ID de creador: ${id}`);
                return null; 
            }
            console.log(`Punto interes encontrado con ID: ${id}`, PuntoInteres[0]);
            return PuntoInteres[0]; // Devuelve el primer (y único) resultado
        } catch (error) {
            console.error('Error al obtener el punto interes en la base de datos:', error);
            throw error; 
        }
    }


    static async editarPuntoInteres(id, PuntoIntere) {
        try {
            const {
                nombrePunto,
                horario = null, // Valor opcional
                imagenPath = null, // Valor opcional
                direccion,
                descripcion = null, // Valor opcional
                idTipoPunto,
                id_creador
            } = PuntoIntere;
    
            const [resultado] = await pool.execute(
                `UPDATE punto_interes
                SET titulo = ?,
                    horario = ?,
                    img_referencia = ?,
                    direccion = ?,
                    descripcion = ?,
                    id_tipo = ?,
                    id_creador = ?
                WHERE id = ?`,
               [
                   nombrePunto,
                   horario,
                   imagenPath,
                   direccion,
                   descripcion,
                   idTipoPunto,
                   id_creador,
                   id
               ]
            );
    
            if (resultado.affectedRows === 0) {
                console.log(`(module) No se encontró un Tipo de Punto con el ID: ${id}`);
                return { status: 404, message: 'Tipo de Punto no encontrado (module)' };
            }
    
            console.log(`Tipo de Punto actualizado con ID: ${id}`);
            return { status: 200, message: 'Tipo de Punto actualizado correctamente' };
    
        } catch (error) {
            console.error('Error al actualizar el Tipo de Punto en la base de datos (module):', error);
            throw error; // Lanza el error para ser manejado en el controlador
        }
    }

    
    static async eliminarPuntoInteresBD(id) {
        try {
            Coordenada.eliminarCoordenadaPorPuntoInteres(id);
            const [resultado] = await pool.execute(   
                `DELETE 
                    FROM punto_interes 
                    WHERE id = ?`,
                [id]
            );
            
            if (resultado.affectedRows === 0) {
                console.log(`No se encontró un punto de interés con el ID: ${id}`);
                return false; 
            }
            if (resultado) {
                console.log(`El punto de interés con ID ${id} fue eliminado.`);
                return true;
            }
        } catch (error) {
            console.error('Error al eliminar del punto de interés:', error.message);
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
