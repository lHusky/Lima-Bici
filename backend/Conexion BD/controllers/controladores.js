// Importa las clases utilizando `import` ya que estás en un entorno ES Module
import Usuario from '../modules/Usuario.js';
import Perfil_Login from '../modules/Perfil_Login.js';

// Función para crear usuario y perfil
const crearUsuarioYPerfil = async (req, res) => {
    const { nombre, email, telefono, contrasena } = req.body;

    try {
        // Crear usuario y obtener id_usuario
        const { id: usuarioID } = await Usuario.crearUsuario(nombre, email, telefono);

        // Crear perfil asociado al id_usuario
        await Perfil_Login.crearPerfil(usuarioID, contrasena, email);

        // Éxito - aprobación de creación de objeto
        res.status(201).json({
            message: 'Usuario y perfil creados exitosamente',
            usuarioID
        });
    } catch (error) {
        console.error('Error al crear el usuario y perfil:', error.message); // Añadido para debug
        res.status(500).json({
            message: 'Error al crear el usuario y perfil',
            error: error.message
        });
    }
};

// Exporta usando `export`
export { crearUsuarioYPerfil };