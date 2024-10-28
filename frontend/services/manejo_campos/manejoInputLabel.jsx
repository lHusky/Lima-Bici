//en caso se quiera limpiar los textos de los labels de error
//PARAMETROS: setError1, setError2 ... etc
export const borrarErrores = (...setsErrores) => {
    setsErrores.forEach(setError => {
        if (typeof setError === 'function') {
            setError('');
        }
      });

  };

//En caso se quiera validar el largo de la contraseña
//PARAMETROS: contraseña, setErrorContraseña
export const largoPassword = ( password,setPasswordError) => {
    let esValido = true;

    if (password.length  < 6 && password != '') {
      esValido = false;
      setPasswordError('*La contraseña debe tener al menos 6 caracteres');    
    }
  
    return esValido;
  };

//En caso haya campos que se ingresen vacios, validarlo y mostrar mensaje
//PARAMETROS: [lista de setErrors], varError1,varError2 ... etc
//(las variables deben coincidir con el orden de los setErros)
export const validarInputVacio = (setErrorFunctions, ...values) => {
    let esVacio = falso;
  
    values.forEach((value, index) => {
      if (value === '') {
        if (typeof setErrorFunctions[index] === 'function') {
          setErrorFunctions[index]('*Este campo no puede estar vacío');
        }
        esVacio = true;
      }
    });
  
    return isValid;
  };

  
  

