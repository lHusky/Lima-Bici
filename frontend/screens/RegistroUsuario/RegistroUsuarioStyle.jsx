import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: "#BFEAAA",
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 40,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: "#BFEAAA",
        marginTop: 90,
        marginBottom: 40,
        marginLeft: 0,
        paddingLeft: 0,
    },
    container2: {
        width: '100%',
        padding: 48,
        backgroundColor: 'white',
        borderRadius: 40,
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
    errorMessage: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
});

export default styles;
