// src/components/EditableField.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditableField = ({ label, value, onSave }) => {
  const [editable, setEditable] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleEdit = () => {
    if (editable) {
      onSave(tempValue);
    }
    setEditable(!editable);
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      {editable ? (
        <TextInput
          style={styles.input}
          value={tempValue}
          onChangeText={setTempValue}
        />
      ) : (
        <Text style={styles.text}>{value}</Text>
      )}
      <Button title={editable ? "Guardar" : "Editar"} onPress={handleEdit} color="#88C057" />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default EditableField;
