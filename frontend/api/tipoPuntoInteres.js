import base from './base.js'

const endpoint = 'tipoPuntoInteres/'

const findAll = async () => await base.get(endpoint)  //obtenerTodos

const create = async (payload) => await base.post(endpoint, payload) //crearUno

const update = async (payload) => await base.put(`${endpoint}/${id}`, payload) //editar

const remove = async (id) => await base.remove(`${endpoint}/${id}`) //eliminarUno

const findOne = async (id) => await base.get(`${endpoint}/${id}`)  //obtenerPorID


const api = { 
    findAll, 
    create, 
    update, 
    remove, 
    findOne}
    
export default api;                 
