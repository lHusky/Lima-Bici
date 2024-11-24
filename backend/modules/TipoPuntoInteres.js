import { pool } from '../database.js';


class TipoPuntoInteres {
    constructor(id, titulo) {
        this.id = id;
        this.titulo = titulo;
    }

    async agregarTipoPuntoInteresBD(titulo) {
        try {
            const [result] = await pool.execute(   
                'INSERT INTO tipo_PuntoInteres(titulo) VALUES (?)',
                [titulo]
            );


            const itemID = result.insertId;
            this.setId(itemID);
            return this;
        } catch (error) {
            console.error('Error en la creación de tipo de punto interes (modulo):', error.message);
            throw error;
        } 
    }

    
    static async obtenerTiposPuntoInteresBD() {
      
        try {
                const [TiposPuntoInteres] = await pool.execute('SELECT * FROM tipo_PuntoInteres');
                if (TiposPuntoInteres.length === 0) {
                    console.log("No se encontraron usuarios en la base de datos.");
                return null;
                }
                return TiposPuntoInteres;
        } catch (error) {
            if (error.code === 'ER_BAD_DB_ERROR') {
                console.error("Error: La base de datos no existe.");
            } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
                console.error("Error: Acceso denegado a la base de datos.");
            } else if (error.code === 'ER_SYNTAX_ERROR') {
                console.error("Error: Error de sintaxis en la consulta.");
            } else {
                console.error("Error al cargar tipos de punto interes desde la base de datos (modules)):", error);
            }
            throw error; 
        } 
    };
    
    static async obtenerTipoPuntosPorID(id) {
        try {
            const [TiposPuntoInteres] = await pool.execute(
                'SELECT id, titulo FROM tipo_PuntoInteres WHERE id = ?',
                [id]
            );
            if (TiposPuntoInteres.length === 0) {
                console.log(`No se encontró un tipos de punto interescon el ID: ${id}`);
                return null; 
            }
            console.log(`Tipos de punto interes encontrado con ID: ${id}`, TiposPuntoInteres[0]);
            return TiposPuntoInteres[0]; // Devuelve el primer (y único) resultado
        } catch (error) {
            console.error('Error al obtener el tipo de punto interes en la base de datos:', error);
            throw error; 
        }
    }
    

    

    static async editarTipoPuntoInteres(id, TipoPuntoInteres) {
        try {
            const { titulo} = TipoPuntoInteres;
    
            const [resultado] = await pool.execute(
                `UPDATE tipo_PuntoInteres
                    SET titulo = ?
                    WHERE id = ?`,
                [titulo,id]
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


   
    static async eliminarTipoPuntoInteres(id) {
        try {

            const [resultado] = await pool.execute(   
                `DELETE 
                    FROM tipo_PuntoInteres 
                    WHERE id = ?`,
                [id]
            );
            
            if (resultado.affectedRows === 0) {
                console.log(`No se encontró un tipo de punto de interés con el ID: ${id}`);
                return false; // Indicar que no se eliminó nada
            }
            if (resultado) {
                console.log(`El tipo de punto de interés con ID ${id} fue eliminado.`);
                return true;
            }
        } catch (error) {
            console.error('Error al eliminar del usuario:', error.message);
            throw error;
        }

    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }
}


  export default TipoPuntoInteres;
  