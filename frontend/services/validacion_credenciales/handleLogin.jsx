import gestionUsuarioApi from '../../api/gestionUsuario.js';
import {borrarErrores,validarInputVacio,largoPassword} from '../manejo_campos/manejoInputLabel.jsx';

export const handleLogin = async (email, password, setEmailError, setPasswordError) => {
    try {
        borrarErrores(setEmailError, setPasswordError);

        let validarCamposVacios=validarInputVacio([setEmailError, setPasswordError], email, password);
        let largoContrasena = largoPassword( password,setPasswordError);

        if (!validarCamposVacios || !largoContrasena) {
            return false;
        }
        let credencialesvalidas=false;

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
