import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e5fede',
    },
    header: {
      height: 150,
      backgroundColor: '#228B22',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 20,
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#ffffff',
      fontFamily: 'Roboto',
      marginTop: 40
    },
    titulo: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#000000',
      fontFamily: 'Roboto',
      marginBottom: 30,
    },
    logoutButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#228B22',
      padding: 10,
      borderRadius: 50,
      marginTop: 40
    },
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container2: {
        width: '100%',
        padding: 48,
        backgroundColor: 'white',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    errorMessage: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
    boton: {
        borderRadius: 20,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#228B22'
    },
    botonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
  })

  export default styles;