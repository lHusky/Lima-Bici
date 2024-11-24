import React, {useState} from 'react';
import { FlatList, ScrollView, View, StyleSheet } from 'react-native';
import Card from './Card';

const Carrousel = ({
  data,
  tamanoLetra=14,
  altura = 150, 
  colorLetraDefecto="black",
  colorLetraSelected="black",
  colorOpcionDefecto="white",
  colorOpcionSelected="grey",
  onItemPress = () => {}, 
  otrosEstilos
}) => {

  const [selectedId, setSelectedId] = useState(null); 
    return (
      <View style={[otrosEstilos]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((item) => (
            <Card
              key={item.id}
              title={item.titulo || "titulo vacio"}
              onPress={() => {if (item.id === selectedId) {
                                setSelectedId(null);
                              } else {
                                setSelectedId(item.id);
                              }
                                onItemPress(item);
                              }}
              altura={altura}
              letraDefecto={{
                          color:colorLetraDefecto,
                          fontSize:tamanoLetra}}
              cardDefecto={{
                          backgroundColor: colorOpcionDefecto}}
              letraSelected={{
                          color:colorLetraSelected,
                          fontSize:tamanoLetra}}
              cardSelected={{
                          backgroundColor: colorOpcionSelected}}          
              isSelected={item.id === selectedId}

            />
          ))}
        </ScrollView>
      </View>
    );
//   }

//   // Renderizado para FlatList
//   return (
//     <View style={[styles.container, containerStyle]}>
//       <FlatList
//         data={data}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <Card
//             title={item.title}
//             image={item.image} // Opcional si la data incluye imágenes
//             onPress={() => onItemPress(item)}
//           />
//         )}
//         keyExtractor={(item) => item.id.toString()} // Asegurar que id sea único y string
//         ItemSeparatorComponent={() => <View style={{ width: spacing }} />} // Separador dinámico
//       />
//     </View>
//   );
};



export default Carrousel;