import base from './base.js';

const endpoint = 'api/ruta';

const findAll = async (limite, id_usuario) => {
    const queryParams = [];
    if (limite !== null && limite !== undefined) queryParams.push(`limite=${limite}`);
    if (id_usuario) queryParams.push(`id_usuario=${id_usuario}`);
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    return await base.get(`${endpoint}${queryString}`);
};



const create = async (payload) => {
    try {
        return await base.post(endpoint, payload);
    } catch (error) {
        console.error('Error al crear la ruta:', error);
        throw error;
    }
};

// Corrección aquí: incluir el ID en la URL
const update = async (payload) => {
    try {
        return await base.put(`${endpoint}/${payload.id}`, payload);
    } catch (error) {
        console.error('Error al actualizar la ruta:', error);
        throw error;
    }
};

const remove = async (id) => {
    try {
        return await base.remove(`${endpoint}/${id}`);
    } catch (error) {
        console.error('Error al eliminar la ruta:', error);
        throw error;
    }
};

const findOne = async (id) => {
    try {
        console.log(`Fetching ruta with ID ${id}`);
        const data = await base.get(`${endpoint}/${id}`);
        console.log('Data from findOne:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener la ruta:', error);
        throw error;
    }
};
const obtenerCoordenadas = async (id_ruta) => {
    try {
        console.log(`Fetching coordinates for ruta with ID ${id_ruta}`);
        const data = await base.get(`${endpoint}/${id_ruta}/coordenadas`);
        console.log('Coordinates data:', data);
        return data; // Return data directly
    } catch (error) {
        console.error('Error en obtenerCoordenadas:', error);
        throw error;
    }
};
const api = { findAll, create, update, remove, findOne, obtenerCoordenadas };

export default api;
