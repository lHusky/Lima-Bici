const URI = 'http://192.168.18.79:3000/';//'http://ec2-3-142-246-223.us-east-2.compute.amazonaws.com:3000/';

const get = async (endpoint) => {
    try {
        console.log(`GET request to: ${URI + endpoint}`);
        const response = await fetch(URI + endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('GET response data:', data);
        return data;
    } catch (error) {
        console.error('Error en GET:', error);
        throw error;
    }
};

const post = async (endpoint, payload) => {
    try {
        console.log(`Enviando solicitud POST a ${URI + endpoint} con payload:`, payload);
        const response = await fetch(URI + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Respuesta recibida del backend:', data);
        return { status: response.status, data };
    } catch (error) {
        console.error('Error en la solicitud POST:', error);
        throw error;
    }
};


const postImagen = async (endpoint, payload) => {
    try {
        console.log(`Enviando imagen a ${URI + endpoint}`);
        const response = await fetch(URI + endpoint, {
            method: 'POST',
            body: payload, // FormData con la imagen
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Error del servidor:", errorBody);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Respuesta del servidor (postImagen):", data);
        return { status: response.status, data };
    } catch (error) {
        console.error("Error al enviar imagen:", error.message);
        throw Error(`Error al enviar imagen: ${error.message}`);
    }
};

const put = async (endpoint, payload) => {
    try {
        const response = await fetch(URI + endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en PUT:', error);
        throw error;
    }
};

const remove = async (endpoint) => {
    try {
        const response = await fetch(URI + endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en DELETE:', error);
        throw error;
    }
};

const base = { get, post, put, remove, postImagen };

export default base;
