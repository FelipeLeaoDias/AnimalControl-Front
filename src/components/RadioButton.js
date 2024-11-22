import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const RadioButton = ({ label, value, selectedValue, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(value)} style={styles.radioButton}>
      <View style={[styles.circle, selectedValue === value && styles.selectedCircle]} />
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginRight: 20,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4D694E',
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: '#4D694E',
  },
  radioLabel: {
    fontSize: width * 0.04, // Ajuste para a fonte
    color: '#000',
  },
});

export default RadioButton;
