import Coordenada from './Coordenada.js';

class PuntoInteres {
                                                     //manejo de campos opcionales
    constructor(id, id_creador , titulo, img_referencial='', direccion, descripcion, id_tipo,latitud,longitud) {
        //manejo de campos obligatorios
        if (!id || !id_creador || !titulo || !direccion || !descripcion || !id_tipo || !latitud || !longitud) {
            throw new Error("Falta completar los campos obligatorios.");
        }
        
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

    async agregarPuntoInteresBD(nombre, email, telefono, contrasena) {
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
    
    async eliminarPuntoInteresBD(nombre, email, telefono, contrasena) {
        try {

            //buscar para obtener id
            const [result] = await pool.execute(   
                'DELETE FROM punto_interes WHERE id = ?',
                [id]
            );
            const usuarioID = result.insertId;
            this.setId(usuarioID);
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