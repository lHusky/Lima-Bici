// Importa las clases utilizando `import` ya que estás en un entorno ES Module
import Usuario from '../modules/Usuario.js';
import GestionUsuario from './GestionUsuario.js';

// Función para crear usuario y perfil
const crearUsuario = async (req, res) => {
    
    const {nombre, email, telefono, password } = req.body;

    try {
        // Crear usuario y obtener id_usuario
        const { id: usuarioID } = await GestionUsuario.registrarUsuario(nombre, email,password, telefono);

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


export { crearUsuario};
