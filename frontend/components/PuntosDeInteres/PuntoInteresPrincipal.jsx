// src/components/Rutas/RutasTodas.jsx

import React, {useState,useEffect} from 'react';
import { View, StyleSheet,Text,TouchableOpacity } from 'react-native';
import PuntoInteres from './PuntoInteres.jsx';
import Carrusel from '../Sugerencias/CarruselGeneral.jsx';
import puntoInteresApi from '../../api/puntoInteres.js';
import TipopuntoInteresApi from '../../api/tipoPuntoInteres.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PuntoInteresPrincipal = () => {

    const [cargaItemsCarrusel, setcargaItemsCarrusel] = useState(false);
    const [ItemsCarrusel, setItemsCarrusel] = useState(false);
    const [mostrarTodos, setMostrarTodos] = useState(false);
    const [puntosInteres, setPuntosInteres] = useState([]); 
    const navigation = useNavigation(); 

    const buscarItemsCarrusel = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
    
            // Obtener los datos del backend
            const response = await puntoInteresApi.findOneByUser(userId);
            if (!response?.success || !Array.isArray(response.items) || response.items.length === 0) {
                console.log("El usuario no tiene puntos registrados.");
                setcargaItemsCarrusel(false);
                setItemsCarrusel([]);
                return;
            }
            // Extraer los puntos de interés
            const puntoInteres = response.items;
    
            // Obtener IDs únicos de tipos de puntos y ordenarlos
            const IDtipospuntoInteres = [...new Set(puntoInteres.map(item => item.id_tipo))].sort();
    
    
            // Obtener detalles de cada tipo de punto de interés
    
            const TipoPuntoInteres = await Promise.all(
                IDtipospuntoInteres.map(item => TipopuntoInteresApi.findOne(item))
            );
    
            const TodosTipoPuntoInteres = TipoPuntoInteres.map(res => res.item);
            console.log("Datos procesados para el carrusel:", TodosTipoPuntoInteres);
    
            // Actualizar los estados con los datos procesados
            setcargaItemsCarrusel(true);
            setItemsCarrusel(TodosTipoPuntoInteres);
        } catch (error) {
            console.error("Error al buscar items para el carrusel:", error);
            setcargaItemsCarrusel(false);
            setItemsCarrusel([]);
        }
    };   

    useEffect(() => {
        buscarItemsCarrusel();
    }, []);

    const handlePress = (id_punto, latitud, longitud) => {
        console.log('Navegando a PaginaBuscar con:', { id_punto, latitud, longitud });
        navigation.navigate('PaginaBuscar', { id_punto, latitud, longitud });
    };

    return (
        <View style={styles.container}>
            {ItemsCarrusel.length > 0 && 
            <Carrusel 
                data={ItemsCarrusel} 
                onItemPress={(item) => console.log('Seleccionaste:', item)}
                tamanoLetra={16}
                altura={40}
                colorLetra="black"
                otrosEstilos={{
                    position: "top",
                    bottom: 1,
                    left: 0,
                    right: 0,
                    paddingVertical: 10,
                  }}
                />
            }
             {/* <TouchableOpacity>
                <Text style={styles.text}>Ver Todos</Text>
              </TouchableOpacity> */}
            <PuntoInteres />
          
            {/* <Text style={styles.subtitle}>Marcadores Favoritos</Text> */}
            {/* <PuntoInteresFavoritos /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    
    text:{
        fontSize:12,
        textAlign: 'right',
    },
    subtitle:{
        fontSize:24,
        textAlign: 'left',
        fontWeight:600
    },
});

export default PuntoInteresPrincipal;
