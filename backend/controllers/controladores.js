// Importa las clases utilizando `import` ya que estás en un entorno ES Module
// import GestionUsuario from '../modules/GestionUsuario.js'
import { gestor } from '../app.js'; 
import GestionUsuario from '../modules/GestionUsuario.js';
// CONTROLADOR: Registrar Usuario
const crearUsuario = async (req, res) => {
    
    const {nombre, email, telefono, password } = req.body;

    try {
        // Crear usuario y obtener id_usuario
        const { id: usuarioID } = await gestor.registrarUsuario(nombre, email,password, telefono);
        console.log(`USUARIO CONTROLADOR`);
        // Éxito - aprobación de creación de objeto
        res.status(201).json({
            message: 'Usuario creados exitosamente',
            usuarioID
        });
        console.log(`MENSAJE DE EXITO ENVIADO`);
    } catch (error) { 
        console.error('Error al crear el usuario (controlador):', error.message); // Añadido para debug
        res.status(500).json({
            message: 'Error al crear el usuario (controlador):',
            error: error.message
        });
    }
};

const cargarUsuarios = async (req, res) => {
    try{
        const usuariosAgregados = await gestor.obtenerUsuariosBD();

        if (!usuariosAgregados) {
            return res.status(404).json({  //404: no se encontro elemento
                message: 'No se encontraron usuarios en la base de datos.'
            });
        }

        // Si se agregaron usuarios correctamente
        res.status(200).json({
            message: 'Usuarios cargados y agregados exitosamente.',
            usuarios: usuariosAgregados
        });


    }catch (error) { 
        console.error('Error al cargar usuarios (controlador):', error.message); // Añadido para debug
        res.status(500).json({
            message: 'Error al cargar usuarios (controlador):',
            error: error.message
        });
    }

}
export { crearUsuario,cargarUsuarios};
