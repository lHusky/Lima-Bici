// Importa las clases utilizando `import` ya que estás en un entorno ES Module
// import GestionUsuario from '../modules/GestionUsuario.js'
import { gestor } from '../app.js'; 
// CONTROLADOR: Registrar Usuario
import nodemailer from 'nodemailer';

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
const iniciarSesion = async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        const response = await gestor.iniciarSesion(email, contrasena);
        
        // Aquí verificamos el código de estado devuelto por el gestor
        if (response.status === 200) {
            // Si el inicio de sesión es exitoso
            res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                usuario: response.user // Retorna el usuario
            });
        } else {
            // Para errores de autenticación
            return res.status(200).json({
                success: false,
                message: response.message // 'Correo electrónico incorrecto' o 'Contraseña incorrecta'
            });
        }
    } catch (error) {
        // En caso de un error en el servidor
        res.status(500).json({ 
            success: false,
            message: 'Error al iniciar sesión (controlador)',
            error });
    }
}


const registrarUsuario = async (req, res) => {
    const { email, contrasena,telefono,nombre } = req.body;

    try {
        const response = await gestor.registrarUsuario( nombre, email, contrasena, telefono);
        
        if (response.status === 200) {
            // Si el inicio de sesión es exitoso
            res.status(200).json({
                success: true,
                message: 'Registro exitoso',
                usuario: response.user // Retorna el usuario
            });
        } else {
            // Para errores de campos
            return res.status(200).json({
                success: false,
                message: response.message // 'Correo Existente' 'Telefono Existente'
            });
        }
    } catch (error) {
        // En caso de un error en el servidor
        res.status(500).json({ 
            success: false,
            message: 'Error al Registrar Usuario (controlador)',
            error });
    }
}


async function enviarCorreo(destinatario, codigo) {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'lima.bicis@gmail.com',
        pass: 'olmt oyox kbjw ehwx',
      },
    });
  
    const mailOptions = {
      from: 'lima.bicis@gmail.com',
      to: destinatario,
      subject: 'Lima Bici - Código de verificación',
      text: `Tu código de verificación es: ${codigo}`,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado: ' + info.response);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }

const crearCodVerificacion = async (req,res) => {
    const {email} = req.body;

    try {
        const resultado = await gestor.asignarCodVerificacion(email);
        
        if (!resultado) {
            return res.status(404).json({
                message: 'no se encuentra usuario', 
            });
        }

        await enviarCorreo(email, resultado.codigo);

        return res.status(201).json({
            message: 'Código creado',
            codigo: resultado.codigo,
        });



    } catch (error) { 
        console.error('Error asignar codigo a usuario (controlador):', error.message); 
        return res.status(500).json({
            message: 'Error asignar codigo a usuario (controlador):',
            error: error.message
        });
    }
}

const cargarCodVerificacion = async(req,res) => {
    const {email} = req.body;
    try {
        const resultado = await gestor.obtenerCodVerificacion(email);

        console.log(resultado)

        if (resultado.status === 410) {
            return res.status(410).json({
                message: resultado.message,
            });
        }

        if (resultado.status === 404) {
            return res.status(404).json({
                message: resultado.message,
            });
        }

        res.status(200).json({
            message: 'Enviando código',
            codigo: resultado.codigo,
        });

    } catch (error) {
        console.error('Error recuperar codigo a usuario (controlador):', error.message); 
        res.status(500).json({
            message: 'Error recuperar codigo a usuario (controlador):',
            error: error.message
        });
    }
}

const actualizarContraseña = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const resultado = await gestor.actContraseña(email, newPassword);
        
        if (!resultado) {
            return res.status(404).json({
                message: 'Usuario no encontrado o contraseña no actualizada', 
            });
        }

        res.status(200).json({
            message: resultado.message,
        });

    } catch (error) { 
        console.error('Error al actualizar contraseña (controlador):', error.message); 
        res.status(500).json({
            message: 'Error al actualizar contraseña (controlador):',
            error: error.message
        });
    }
}


// const obtenerUsuarioPorID = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const usuario = await gestor.obtenerUsuarioPorID(id);
//         if (usuario) {
//             return res.status(200).json({ 
//                 success: true, usuario });
//         } else {
//             return res.status(404).json({ 
//                 success: false, message: "Usuario no encontrado." });
//         }
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "Error al obtener el usuario.", error: error.message });
//     }
// };


const editarUsuario = async (req, res) => {
    const usuario = req.body; 

    try {
        const result = await gestor.editarUsuario(usuario);

        if (result) {
            // Si el usuario fue actualizado con éxito
            return res.status(200).json({ 
                success: true, message: "Usuario actualizado con éxito." });
        } else {
            // Si no se encontró el usuario con el ID proporcionado
            return res.status(404).json({ 
                success: false, message: "Usuario no encontrado." });
        }
    } catch (error) {
        // Manejo de errores del servidor
        return res.status(500).json({ 
            success: false, message: "Error al actualizar el usuario.", error: error.message });
    }
};

export { crearUsuario,cargarUsuarios,iniciarSesion,registrarUsuario,crearCodVerificacion,cargarCodVerificacion,actualizarContraseña,editarUsuario};

