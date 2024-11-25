// controllers/controladorRutas.js
import db from '../database.js'; // Asegúrate de que la ruta sea correcta
import GestionRuta from '../modules/GestionRuta.js';
import { agregarFavorito } from '../database.js';


const gestionRuta = new GestionRuta();

const crearRuta = async (req, res) => {
    console.log("Datos recibidos para crear la ruta:", req.body);
    try {
        const rutaGuardada = await gestionRuta.crearRuta(req.body);
        res.status(201).json({ message: 'Ruta creada exitosamente', ruta: rutaGuardada });
    } catch (error) {
        console.error("Error al crear la ruta:", error);
        console.log('Número de rutas devueltas:', rows.length);

        res.status(500).json({ message: 'Error al crear la ruta', error: error.message });
    }
};



const obtenerRutasUsuario = async (req, res) => {
    const userId = req.params.userId;
    try {
        const rutas = await gestionRuta.obtenerRutasUsuario(userId);
        res.status(200).json({ message: 'Rutas obtenidas exitosamente', rutas: rutas });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las rutas', error: error.message });
    }
};

const obtenerRutaPorId = async (req, res) => {
    const id = req.params.id; // Obtenemos el ID desde la URL
    try {
        const [rows] = await db.query('SELECT * FROM ruta WHERE id = ?', [id]); // Consulta SQL
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Ruta no encontrada' }); // Si no hay resultados
        }
        res.status(200).json(rows[0]); // Devuelve la primera fila como JSON
    } catch (error) {
        console.error('Error al obtener la ruta:', error);
        res.status(500).json({ message: 'Error al obtener la ruta' });
    }
};

const agregarFavoritoControlador = async (req, res) => {
    const { userId, rutaId, puntoInteresId, descripcion } = req.body;
    const fechaAgregado = new Date();
    try {
        const favorito = new Favorito(null, userId, rutaId, puntoInteresId, descripcion, fechaAgregado);
        const favoritoGuardado = await favorito.guardarFavorito();
        res.status(201).json({ message: 'Favorito agregado exitosamente', favorito: favoritoGuardado });
    } catch (error) {
        console.error('Error al agregar favorito:', error);
        res.status(500).json({ message: 'Error al agregar a favoritos', error: error.message });
    }
};


const obtenerTodasLasRutas = async (req, res) => {
    const id_usuario = req.query.id_usuario;

    try {
        let query = `
            SELECT 
                ruta.id, 
                ruta.descripcion, 
                ruta.distancia, 
                ruta.duracion, 
                ruta.fechaInicio, 
                ruta.horaInicio, 
                ruta.nombre,
                CASE WHEN favoritos.id IS NOT NULL THEN 1 ELSE 0 END AS esFavorito
            FROM ruta
            LEFT JOIN favoritos ON ruta.id = favoritos.id_ruta AND favoritos.id_usuario = ?
            ORDER BY ruta.fechaInicio DESC, ruta.horaInicio DESC
        `;
        
        const [rows] = await db.query(query, [id_usuario]);
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error('Error al obtener las rutas:', error);
        res.status(500).json({ success: false, message: 'Error al obtener las rutas', error: error.message });
    }
};



const actualizarRuta = async (req, res) => {
    const id_ruta = req.params.id_ruta;
    const { nombre, descripcion } = req.body;
    try {
      await db.query(
        `UPDATE ruta SET nombre = ?, descripcion = ? WHERE id = ?`,
        [nombre, descripcion, id_ruta]
      );
      res.status(200).json({ message: 'Ruta actualizada exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la ruta', error: error.message });
    }
};

const obtenerCoordenadasRuta = async (req, res) => {
    const id_ruta = req.params.id_ruta;

    try {
        const [rows] = await db.query(
            'SELECT latitud, longitud FROM coordenada WHERE id_ruta = ? ORDER BY orden',
            [id_ruta]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron coordenadas para esta ruta' });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener las coordenadas de la ruta:', error);
        res.status(500).json({ message: 'Error al obtener las coordenadas', error: error.message });
    }
};
export { crearRuta, obtenerRutasUsuario, obtenerRutaPorId, agregarFavoritoControlador, obtenerTodasLasRutas, actualizarRuta, obtenerCoordenadasRuta   };
