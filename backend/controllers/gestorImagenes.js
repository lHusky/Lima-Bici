import GestorImagenes from "../modules/GestorImagenes.js";
import path from "path";

const gestorImagenes = new GestorImagenes();

const subirImagen = (req, res) => {
  const tipo = req.params.tipo;
  const upload = gestorImagenes.obtenerMulter(tipo).single("imagen");

  upload(req, res, async (err) => {
    if (err) {
      console.error("Error en Multer:", err.message);
      return res.status(400).json({ success: false, message: err.message });
    }

    const tipoNormalizado = tipo.toLowerCase();
    if (!gestorImagenes.rutas[tipoNormalizado]) {
      console.error(`Tipo no soportado: ${tipoNormalizado}`);
      return res.status(400).json({
        success: false,
        message: `Tipo no soportado. Tipos válidos: ${Object.keys(
          gestorImagenes.rutas
        ).join(", ")}`,
      });
    }

    if (!req.file) {
      console.error("Archivo no encontrado en la solicitud");
      return res.status(400).json({
        success: false,
        message: "No se subió ninguna imagen",
      });
    }
    console.log("Archivo recibido y guardado en:", req.file.path);
    console.log("Datos del archivo recibido:", req.file);
    
      // Generar la ruta relativa para la respuesta
    const rutaCompleta = `${req.protocol}://${req.get('host')}/assets/${tipoNormalizado}/${req.file.filename}`;

    console.log("Ruta relativa generada:", rutaCompleta);
    res.json({
      success: true,
      message: "Imagen subida y convertida correctamente",
      path: rutaCompleta,
    });
  });
};

export { subirImagen };


// Controlador para subir imágenes
// const subirImagen = (req, res, next) => {
//   try {
//     const { tipo } = req.params;

//     // Validar tipo
//     if (!gestorImagenes.rutas[tipo]) {
//       return res.status(400).json({
//         success: false,
//         message: `Tipo no soportado. Tipos válidos: ${Object.keys(
//           gestorImagenes.rutas
//         ).join(", ")}`,
//       });
//     }

//     // Obtener middleware de multer según el tipo
//     const upload = gestorImagenes.obtenerMulter(tipo);
    
//     // Ejecutar subida
//     upload(req, res, (err) => {
//       if (err) {
//         return res.status(500).json({
//           success: false,
//           message: "Error al subir la imagen",
//           error: err.message,
//         });
//       }

//       if (!req.file) {
//         return res.status(400).json({
//           success: false,
//           message: "No se subió ninguna imagen",
//         });
//       }

//       // Retornar la ruta de la imagen subida
//       const rutaRelativa = path.join(
//         gestorImagenes.rutas[tipo],
//         req.file.filename
//       );
//       res.json({
//         success: true,
//         message: "Imagen subida correctamente",
//         path: rutaRelativa,
//       });
//     });
//   } catch (error) {
//     console.error("Error en el controlador subirImagen:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Error interno en el servidor",
//       error: error.message,
//     });
//   }
// };

// Controladores para obtener o eliminar imágenes

// const obtenerPorIDPunto = (req, res) => {
//   const { id } = req.params;
//   // Aquí deberías implementar la lógica para obtener información de un punto de interés por ID.
//   res.json({ success: true, message: `Obteniendo punto de interés con ID: ${id}` });
// };

// const obtenerPorIDUsuario = (req, res) => {
//   const { id } = req.params;
//   // Aquí deberías implementar la lógica para obtener información de un usuario por ID.
//   res.json({ success: true, message: `Obteniendo usuario con ID: ${id}` });
// };

// const eliminarPorID = (req, res) => {
//   const { id, tipo } = req.params;
//   // Aquí deberías implementar la lógica para eliminar imágenes según el ID y tipo.
//   res.json({ success: true, message: `Eliminando ${tipo} con ID: ${id}` });
// };
// obtenerPorIDPunto, obtenerPorIDUsuario, eliminarPorID };
