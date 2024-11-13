import gestionUsuarioApi from '../../api/gestionUsuario.js';
import {borrarErrores,validarInputVacio,largoPassword} from '../manejo_campos/manejoInputLabel.jsx';

export const handleLogin = async (email, password, setEmailError, setPasswordError) => {
    let credencialesvalidas=false;
    try {
        await borrarErrores(setEmailError, setPasswordError);

        let validarCamposVacios=await validarInputVacio ([setEmailError, setPasswordError], email, password);
        if (validarCamposVacios) {
            return credencialesvalidas;
        }
        let largoContrasena = await largoPassword( password,setPasswordError);

        if (!largoContrasena) {
            return credencialesvalidas;
        }

        const {status, data } = await gestionUsuarioApi.iniciarSesion(email, password);

        if (data.success) {
            credencialesvalidas=true;
        } else {
            if (data.message === 'Correo no registrado.') { 
                setEmailError('*El correo no está registrado');
            } else if (data.message === 'Contraseña incorrecta.' ) { 
                setPasswordError('*La contraseña es incorrecta');
            }
        }
    } catch (error) {
        console.log('Error durante el inicio de sesión: (front)', error);
  }
  return credencialesvalidas;
};
