import multer from "multer";  //middleware de Node.js para manejar la subida de archivos
import path from "path"; //proporciona utilidades para trabajar con rutas de archivos y directorios
import fs from "fs"; //nos permite interactuar con el sistema de archivos.

class GestorImagenes {
  constructor() {
    this.rutas = {
      perfil: path.join("..","assets", "perfil"),
      puntointeres: path.join("..","assets", "puntointeres"),
    };
    this.initDirectories(); // existen los directorios?
  }

  // Crear directorios si no existen
  initDirectories() {
    Object.values(this.rutas).forEach((ruta) => {
      if (!fs.existsSync(ruta)) {
        fs.mkdirSync(ruta, { recursive: true });
      }
    });
  }

  // Configuración dinámica de almacenamiento según el tipo
  obtenerMulter(tipo) {
    const rutaDestino = this.rutas[tipo];
    if (!rutaDestino) {
      throw new Error(`Tipo no soportado: ${tipo}`);
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, rutaDestino); // Ruta basada en el tipo
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Nombre único para el archivo
      },
    });
     // Validación del formato de archivo
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Formato de archivo no soportado. Solo se permiten JPEG, JPG y PNG."), false);
    }
    cb(null, true); // Aceptar el archivo
  };

  return multer({ storage, fileFilter });
  }
}

export default GestorImagenes;
