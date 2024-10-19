import { Text, StyleSheet, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import React, { Component } from 'react';

const { width, height } = Dimensions.get('window');  // Obter as dimensões da tela

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.forms}>
          <Text style={styles.label}>Home</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    width: '100%',
    height: '100%',
  },
  forms: {
    width: '60%',  // Define a largura tanto para o input quanto para o botão
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: width * 0.045,  // Tornando a fonte responsiva
    color: '#000',
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  input: {
    width: '100%',  // O input ocupará 100% da largura do componente forms
    height: height * 0.06,  // 6% da altura da tela
    borderColor: '#4F7942',
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 10,
    marginBottom: height * 0.03,  // Margin abaixo dos inputs será 3% da altura da tela
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
  },
  button: {
    width: '100%',  // O botão terá a mesma largura do input
    backgroundColor: '#4F7942',
    paddingVertical: height * 0.015,  // O padding vertical do botão será 1.5% da altura da tela
    borderRadius: 5,
    alignItems: 'center',  // Centraliza o texto dentro do botão
    marginBottom: height * 0.05,  // Margin abaixo do botão será 5% da altura da tela
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,  // O tamanho do texto será 4.5% da largura da tela
  },
});
