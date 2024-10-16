const URI = 'http://ec2-3-142-246-223.us-east-2.compute.amazonaws.com:3000/';

const get = async (endpoint) => {
    
    const response = await fetch(URI + endpoint);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // const text = await response.text(); // Captura la respuesta como texto
    // console.log(text); // Imprime la respuesta para verificar su contenido
    // return JSON.parse(text);

    const data = await response.json(); 
    return data;

    
}

const post = async (endpoint, payload) => {

    const postPayload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    const response = await fetch(URI + endpoint, postPayload);
    
    // Asegúrate de que la respuesta sea exitosa
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Extraer JSON del cuerpo de la respuesta
    return { status: response.status, data };
    
  }

  const put = async (endpoint, payload) => {

    const postPayload = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    
    }

    return await fetch(URI + endpoint, postPayload)
              .then(response => response.json())
              .then(data => {
                  return data
              })
  }

  const remove = async (endpoint) => {

    const postPayload = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return await fetch(URI + endpoint, postPayload)
              .then(response => response.json())
              .then(data => {
                  return data
              })
  }

const base = { get, post, put, remove }

export default base;
