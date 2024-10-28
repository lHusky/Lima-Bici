import base from './base.js'

const endpoint = 'api/gestionUsuario'

const findAll = async () => await base.get(endpoint)

const create = async (payload) => await base.post(endpoint, payload)

const update = async (payload) => await base.put(endpoint, payload)

const remove = async (id) => await base.remove(`${endpoint}/${id}`)

const findOne = async (id) => await base.get(`${endpoint}/${id}`)


const iniciarSesion = async (email, password) => {

    const payload = {
        email: email,
        contrasena: password
    };

    return await base.post(endpoint+'/iniciarSesion', payload);
  };


const registrarUsuario = async (payload) => await base.post(endpoint+'/registrarUsuario', payload)


const api = { findAll, create, update, remove, findOne, iniciarSesion,registrarUsuario }

export default api;                 