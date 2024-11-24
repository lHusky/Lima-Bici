import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputConContador = ({ 
    maxCaracteres, 
    value, 
    onChangeText, 
    placeholder, 
    style, 
    alto= 30, 
    alineaTexto = "top"}) => {
  const [texto, setTexto] = useState(value || "");
  const [mssMaxDesc, setMssMaxDesc]= useState("");
  const [colorCounter, setColorCounter]= useState("");
  const handleTextChange = (text) => {
    if (text.length <= maxCaracteres) {
      setTexto(text);
      if (onChangeText) {
        onChangeText(text);
        setMssMaxDesc("");
        setColorCounter("#555");
      }
    }else{
        setMssMaxDesc("*Alcanzaste el limite de caracteres");
        setColorCounter("red");
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input, styles.textArea, {
            height: alto, // Altura dinámica
            textAlignVertical: alineaTexto, // Alineación dinámica
          },]}
        placeholder={placeholder || "Escribe algo aquí..."}
        value={texto}
        onChangeText={handleTextChange}
        multiline={true}
      />
      <View style={styles.textRow}>
        <Text style= {[{color: colorCounter}]}>
            {mssMaxDesc}
        </Text>
        <Text style={[styles.counter, 
                    {color: colorCounter},]}>
            {texto.length}/{maxCaracteres}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    textAlignVertical: "top", // Asegura que el texto comience desde la parte superior
  },
  textArea: {
    padding:10,
  },
  counter: {
    textAlign: "right", // Alinea el contador a la derecha
    fontSize: 12,
    textAlignVertical: "top",  //??
  },
  textRow: {
    flexDirection: "row", // Alinea los elementos horizontalmente
    justifyContent: "space-between", // Distribuye los textos entre el inicio y el final
    alignItems: "center", // Alinea verticalmente los textos
    paddingHorizontal: 10, // Espaciado interno horizontal
    paddingVertical: 1, // Espaciado interno vertical
    width: "100%", // Asegura que ocupe todo el ancho disponible
    marginBottom:6,

  },
});

export default InputConContador;