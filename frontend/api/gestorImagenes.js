import base from './base.js';

const endpoint = 'gestorImagenes/';

const subir = async (tipo, image) => {
    if (!image?.uri) {
      throw new Error("El archivo no tiene una URI válida.");
    }
    const formData = new FormData();
    formData.append("imagen", {
    uri: image.uri,
    type: image.uri.endsWith(".png") ? "image/png" : "image/jpeg", // Determina el tipo MIME
    name: image.uri.split("/").pop(),
    });

  
    const response = await base.postImagen(`${endpoint}${tipo}`, formData);
    return response.data.path;
  };
  

const api = { subir };

export default api;

