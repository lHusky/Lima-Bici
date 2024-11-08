// Usuario.js
import { pool } from '../database.js';

class Usuario {
    constructor(id, nombre, email, telefono, fechaCumple, fotoPerfil, contrasena, peso, estadoSesion, estadoRecorrido, verificationCode, verificationCodeExpires) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.fechaCumple = fechaCumple;
        this.fotoPerfil = fotoPerfil;
        this.contrasena = contrasena;
        this.peso = peso;
        this.estadoSesion = estadoSesion;
        this.estadoRecorrido = estadoRecorrido;
        this.verificationCode = verificationCode;
        this.verificationCodeExpires = verificationCodeExpires;
    }

    // Métodos Usuario
    async agregarUsuarioBD(nombre, email, telefono, contrasena) {
        try {
            const [result] = await pool.execute(   
                'INSERT INTO usuario (nombre, email, telefono, contrasena) VALUES (?, ?, ?, ?)',
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

    // Usuario activo
    static async usuarioActivo(){
        this.estadoSesion = true;
    }

    // Usuario inactivo
    static async usuarioInactivo(){
        this.estadoSesion = false;
    }

    setId(id){
        this.id=id;
    }

    getId(){
        return this.id;
    }
    // Getters y Setters  
    setPesoUsuario(peso) {
        this.peso = peso;
    }

    getPesoUsuario(){
        return this.peso;
    }

    getNombre() {
        return this.nombre;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }
    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getTelefono() {
        return this.telefono;
    }

    setTelefono(telefono) {
        this.telefono = telefono;
    }

    getContrasena() {
        return this.contrasena;
    }

    setContrasena(contrasena) {
        this.contrasena = contrasena;
    }

    getFotoPerfil() {
        return this.fotoPerfil;
    }

    setFotoPerfil(fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }

    getFechaCumple() {
        return this.fechaCumple;
    }

    setFechaCumple(fechaCumple) {
        this.fechaCumple = fechaCumple;
    }

}

export default Usuario;
