
import gestionUsuarioApi from '../../api/gestionUsuario.js';
import {borrarErrores,validarInputVacio,largoPassword} from '../manejo_campos/manejoInputLabel.jsx';


export const handleSubmit = async (user,confPassword,setEmailError,setPasswordError,setPhoneError,setConfPasswordError) => {
    try{
        let credencialesvalidas=false;
        borrarErrores(setEmailError,setPasswordError,setPhoneError,setConfPasswordError);

        let validarCamposVacios=validarInputVacio(
                        [setEmailError, setPasswordError,setPhoneError,setConfPasswordError], 
                        user.email, user.contrasena,user.telefono,confPassword);

        let largoContrasena = largoPassword( user.contrasena,setPasswordError);
        
        if (!validarCamposVacios || !largoContrasena) {
            return credencialesvalidas;
        }
    
        if (user.contrasena !== confPassword) {
            setConfPasswordError('*Las contraseñas no coinciden');
            return credencialesvalidas;
        }
        const {status, data} = await gestionUsuarioApi.registrarUsuario(user)
       
        if (data.success) {
            credencialesvalidas=true;
        }else{
            if (data.message === 'El correo ya está registrado') { 
                setEmailError(data.message);
            } else if (data.message === 'El número de celular ya está registrado.') { 
                setPasswordError(data.message);
            }
            return credencialesvalidas;
        }
        return credencialesvalidas;
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        Alert.alert('Error', 'Hubo un problema al registrar el usuario.');
    }
};