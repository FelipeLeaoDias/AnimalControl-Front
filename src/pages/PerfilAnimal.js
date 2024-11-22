import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import * as SecureStorage from 'expo-secure-store'
import {get} from '../utils/axios'
import Botao from '../components/Botao';

const { width, height } = Dimensions.get('window'); // Obter as dimensões da tela

export default class PerfilAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: [],
    };
  }



  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.forms}>
          <Text style={styles.label}>Animal</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  forms: {
    marginBottom: 20,
  },
  label: {
    fontSize: width * 0.045, // Tornando a fonte responsiva
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: height * 0.06,
    borderColor: '#4D694E',
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#D3D3D3',
  },
  button: {
    backgroundColor: '#4D694E',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#4D694E',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: width * 0.04,
    color: '#000',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
