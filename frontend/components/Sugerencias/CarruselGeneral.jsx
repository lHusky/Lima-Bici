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
};



export default Carrousel;