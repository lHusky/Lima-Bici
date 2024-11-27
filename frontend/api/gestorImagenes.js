import base from './base.js';
import { URI, postImagen } from './base.js';
const endpoint = 'gestorImagenes/';

const subir = async (tipo, image) => {
  if (!image?.uri) {
    throw new Error("El archivo no tiene una URI válida.");
  }

  const formData = new FormData();
  formData.append("imagen", {
    uri: image.uri,
    type: image.uri.endsWith(".png") ? "image/png" : "image/jpeg",
    name: image.uri.split("/").pop(),
  });

  try {
    // console.log(`Enviando imagen a ${URI + endpoint}${tipo}`);
    const response = await base.postImagen(`${endpoint}${tipo}`, formData);
    // console.log("Respuesta del servidor:", response);

    if (!response?.data?.path) {
      console.error("Respuesta del servidor inesperada:", response);
      throw new Error("La respuesta del servidor no contiene la propiedad 'path'");
    }

    return response.data; // Retorna toda la respuesta
  } catch (error) {
    console.error("Error al enviar imagen:", error);
    throw error; // Lanza el error para ser manejado externamente
  }
};

  

const api = { subir };

export default api;

