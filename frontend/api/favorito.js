import base from './base.js';

const endpoint = 'favorito';

const toggleFavorito = async (payload) => {
    try {
        return await base.post(`${endpoint}/toggle`, payload);
    } catch (error) {
        console.error('Error en toggleFavorito:', error);
        throw error;
    }
};

const getFavoritas = async (id_usuario) => {
    try {
        return await base.get(`${endpoint}/${id_usuario}`);
    } catch (error) {
        console.error('Error en getFavoritas:', error);
        throw error;
    }
};

const api = { toggleFavorito, getFavoritas };

export default api;
