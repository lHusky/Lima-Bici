import React from 'react';
import { FlatList, ScrollView, View, StyleSheet } from 'react-native';
import Card from './Card';

const Carrousel = ({
  data,
  tamanoLetra=14,
  altura = 150, 
  colorLetra="black",
  onItemPress = () => {}, 
}) => {

    return (
      <View style={
                [styles.container]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((item) => (
            
            <Card
              key={item.id}
              title={item.title || "titulo vacio"}
              onPress={() => onItemPress(item.title)} 
              tamanoLetra={tamanoLetra}
              altura={altura}
              colorLetra={colorLetra}
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    position: 'absolute',
    bottom: 95,
    left: 0,
    right: 0,
  },
});

export default Carrousel;