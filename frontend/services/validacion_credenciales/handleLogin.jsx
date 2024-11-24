import gestionUsuarioApi from '../../api/gestionUsuario.js';
import {borrarErrores,validarInputVacio,largoPassword} from '../manejo_campos/manejoInputLabel.jsx';

export const handleLogin = async (email, password, setEmailError, setPasswordError) => {
    
    try {
        await borrarErrores(setEmailError, setPasswordError);

        let validarCamposVacios=await validarInputVacio ([setEmailError, setPasswordError], email, password);
        if (validarCamposVacios) {
            return { success: false };
        }
        let largoContrasena = await largoPassword( password,setPasswordError);

        if (!largoContrasena) {
            return { success: false };
        }

        const {status, data } = await gestionUsuarioApi.iniciarSesion(email, password);

        if (data.success) {
            return { success: true, usuario: data.usuario };
        } else {
            if (data.message === 'Correo no registrado.') { 
                setEmailError('*El correo no está registrado');
            } else if (data.message === 'Contraseña incorrecta.' ) { 
                setPasswordError('*La contraseña es incorrecta');
            }
        }
        // return { success: false };
    } catch (error) {
        console.log('Error durante el inicio de sesión: (front)', error);
  }
  return { success: false };
};
