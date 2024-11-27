import multer from "multer";  //middleware de Node.js para manejar la subida de archivos
import path from "path"; //proporciona utilidades para trabajar con rutas de archivos y directorios
import fs from "fs"; //nos permite interactuar con el sistema de archivos.
import { fileURLToPath } from 'url';

// Redefinir __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class GestorImagenes {
  constructor() {
    this.rutas = {
      perfil: path.resolve(__dirname, "../assets/perfil"), // Rutas absolutas
      puntointeres: path.resolve(__dirname, "../assets/puntointeres"),
    };
    this.initDirectories(); // existen los directorios?
  }

  // Crear directorios si no existen
  initDirectories() {
    Object.values(this.rutas).forEach((ruta) => {
      if (!fs.existsSync(ruta)) {
        fs.mkdirSync(ruta, { recursive: true });
        console.log(`Carpeta creada: ${ruta}`);
      } else {
        console.log(`Carpeta ya existe: ${ruta}`);
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
        console.log(`Subiendo archivo a: ${rutaDestino}`); 
        cb(null, rutaDestino); // Ruta basada en el tipo
      },
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}_${file.originalname}`;
        console.log(`Nombre del archivo: ${uniqueName}`); // Debug
        cb(null, uniqueName); // Nombre único para el archivo
      },
    });
     // Validación del formato de archivo
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Formato de archivo no soportado. Solo JPEG y PNG son válidos."), false);
      }
    cb(null, true); // Aceptar el archivo
  };

  return multer({ storage, fileFilter });
  }
}

export default GestorImagenes;
