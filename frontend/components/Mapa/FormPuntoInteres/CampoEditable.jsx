import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CampoEditable = ({
  value, // Valor actual
  onSave, // Función que se ejecuta al guardar el cambio
  editableTitleStyle = {}, // Estilo del campo editable (input)
  displayTitleStyle = {}, // Estilo del texto mostrado
  iconsContainerStyle = {}, // Estilo del contenedor de los íconos
  rowStyle = {}, // Estilo del contenedor principal
  iconColor = { edit: "#4CAF50", save: "green", cancel: "red" }, // Colores de los íconos
  multiline = true, // Habilitar múltiples líneas en el input
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  // Sincroniza el valor temporal con el valor externo si cambia
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(tempValue); // Llama a la función `onSave` del padre con el nuevo valor
    setIsEditing(false); // Finaliza el modo de edición
  };

  const handleCancel = () => {
    setTempValue(value); // Restaura el valor original
    setIsEditing(false); // Finaliza el modo de edición
  };

  return (
    <View style={[styles.row, rowStyle]}>
      {isEditing ? (
        <View style={[styles.editableRow]}>
          <TextInput
            style={[styles.editableTitle, editableTitleStyle]}
            value={tempValue}
            onChangeText={setTempValue}
            multiline={multiline}
          />
          <View style={[styles.iconsContainer, iconsContainerStyle]}>
            <TouchableOpacity onPress={handleCancel}>
              <MaterialIcons name="close" size={24} color={iconColor.cancel} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <MaterialIcons name="check" size={26} color={iconColor.save} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Text style={[styles.displayTitle, displayTitleStyle]}>{value}</Text>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <MaterialIcons name="edit" size={26} color={iconColor.edit} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  editableRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  editableTitle: {
    flex: 1,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 5,
    marginRight: 10,
  },
  displayTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default CampoEditable;
