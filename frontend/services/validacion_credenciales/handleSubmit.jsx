
import gestionUsuarioApi from '../../api/gestionUsuario.js';
import {borrarErrores,validarInputVacio,largoPassword} from '../manejo_campos/manejoInputLabel.jsx';

//cuando una celda esta vacia, si se ejecuta o da respuesta RegistrarUsuario (backend)
export const handleSubmit = async (user,confPassword,setEmailError,setPasswordError,setPhoneError,setConfPasswordError) => {
    let credencialesvalidas=false;
    try{
        await borrarErrores(setEmailError,setPasswordError,setPhoneError,setConfPasswordError);

        let validarCamposVacios= await validarInputVacio(
                        [setEmailError, setPasswordError,setPhoneError,setConfPasswordError], 
                        user.email, user.contrasena,user.telefono,confPassword);
        //cuando una celda esta vacia,
        if (validarCamposVacios) {
            return credencialesvalidas;
        }
                      
        let largoContrasena = await largoPassword( user.contrasena,setPasswordError);
        
        if (!largoContrasena) {
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
        }
        return credencialesvalidas;
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        Alert.alert('Error', 'Hubo un problema al registrar el usuario.');
    }
    return credencialesvalidas;
};