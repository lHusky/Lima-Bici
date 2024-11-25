    // controllers/favoritoController.js
    import Favorito from '../modules/Favorito.js';

    const toggleFavoritoRuta = async (req, res) => {
        const { id_usuario, id_ruta } = req.body;

        try {
            const existeFavorito = await Favorito.existeFavoritoRuta(id_usuario, id_ruta);

            if (existeFavorito) {
                // Eliminar favorito
                await Favorito.eliminarFavoritoRuta(id_usuario, id_ruta);
                res.status(200).json({ message: 'Favorito eliminado exitosamente', isFavorito: false });
            } else {
                // Agregar favorito
                await Favorito.agregarFavoritoRuta(id_usuario, id_ruta);
                res.status(201).json({ message: 'Favorito agregado exitosamente', isFavorito: true });
            }
        } catch (error) {
            console.error('Error al togglear favorito:', error);
            res.status(500).json({ message: 'Error al togglear favorito', error: error.message });
        }
    };

    const obtenerFavoritas = async (req, res) => {
        const id_usuario = req.params.id_usuario;
    
        try {
            const [rows] = await db.query(
                `
                SELECT 
                    ruta.id, 
                    ruta.nombre, 
                    ruta.descripcion, 
                    ruta.distancia, 
                    ruta.duracion, 
                    ruta.fechaInicio, 
                    ruta.horaInicio
                FROM ruta
                JOIN favoritos ON ruta.id = favoritos.id_ruta
                WHERE favoritos.id_usuario = ?
                ORDER BY favoritos.fecha_agregado DESC
                `,
                [id_usuario]
            );
    
            res.status(200).json({ success: true, data: rows });
        } catch (error) {
            console.error('Error al obtener rutas favoritas:', error);
            res.status(500).json({ success: false, message: 'Error al obtener rutas favoritas', error: error.message });
        }
    };

export { toggleFavoritoRuta, obtenerFavoritas };
