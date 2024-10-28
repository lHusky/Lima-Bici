import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fondo: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end', 
      alignItems: 'center',
    },
    container: { 
      backgroundColor: 'white',
      borderRadius: 20,
      width: '90%',
      padding: '10%',
      paddingBottom: 10,
      justifyContent: 'space-between',
      marginBottom: 30, 
      marginTop: 20,
    },
    textInput: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 20,
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 10,
      marginBottom: 5,
    },
    errorText: {
      color: 'red',
      fontSize: 10,
      marginBottom: 5,
    },
    placeholderText: {
      color: 'gray',
    },
    containerOpciones: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 15,
      height: 15,
      borderWidth: 2,
      borderColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checked: {
      backgroundColor: '#000',
    },
    checkboxText: {
      marginLeft: 8,
      fontSize: 13,
    },
    textContraseña: {
      color: 'blue',
      textDecorationLine: 'underline',
      fontSize: 13,
    },
    containerBoton: {
      borderRadius: 20,
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    botonLogin: {
      backgroundColor: '#228B22',
    },
    textoLogin: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18
    },
    textoCrear: {
      color: '#228B22',
      fontWeight: 'bold',
      fontSize: 18
    }
  });

  export default styles;