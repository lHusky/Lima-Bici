import base from './base.js'

const endpoint = 'api/gestionUsuario'

const findAll = async () => await base.get(endpoint)

const create = async (payload) => await base.post(endpoint, payload)

const update = async (payload) => await base.put(endpoint, payload)

const remove = async (id) => await base.remove(`${endpoint}/${id}`)

const findOne = async (id) => await base.get(`${endpoint}/${id}`) 
// usar para encontrar el usuario que inicio sesion en ese dispositivo

const iniciarSesion = async (email, password) => {

    const payload = {
        email: email,
        contrasena: password
    };

    return await base.post(endpoint+'/iniciarSesion', payload);
  };

  const editarUsuario = async (id, usuarioData) => {
    const payload = {
        nombre: usuarioData.nombre,
        telefono: usuarioData.telefono,
        email: usuarioData.email,
        contrasena: usuarioData.contrasena,
        fechaCumple: usuarioData.fechaCumple, 
    };
    return await base.put(`${endpoint}/${id}`, payload);
};



const registrarUsuario = async (payload) => await base.post(endpoint+'/registrarUsuario', payload)

const createVerfCode = async(email) => await base.post(`${endpoint}/crearVerCodigo`, email)

const findVerfCode = async(email) => await base.post(`${endpoint}/findVerCodigo`, email)

const updatePass = async(payload) => await base.put(`${endpoint}/updateContrasena`, payload)

const api = { findAll, create, update, remove, findOne, iniciarSesion,registrarUsuario, createVerfCode, findVerfCode, updatePass, editarUsuario}

export default api;                 