import gestionUsuarioApi from '../../api/gestionUsuario.js';
import { borrarErrores, validarInputVacio } from '../manejo_campos/manejoInputLabel.jsx';

export const handleEdit = async (user, setEmailError, setPhoneError) => {
  let credencialesValidas = false;

  try {
    await borrarErrores(setEmailError, setPhoneError);

    const camposVacios = await validarInputVacio(
      [setEmailError, setPhoneError],
      user.email,
      user.telefono
    );
    if (camposVacios) {
      return credencialesValidas;
    }

    const data = await gestionUsuarioApi.updateOne(user.id, user);
    console.log(data);
    if (data.success) {
      credencialesValidas = true;
    } else {
      if (data.message === 'El correo ya está registrado') {
        setEmailError(data.message);
      } else if (data.message === 'El número de celular ya está registrado.') {
        setPhoneError(data.message);
      }
    }

    return credencialesValidas;
  } catch (error) {
    console.error('Error al editar el usuario:', error);
    Alert.alert('Error', 'Hubo un problema al editar el usuario.');
  }

  return credencialesValidas;
};
