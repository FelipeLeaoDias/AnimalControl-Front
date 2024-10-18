import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { Component } from 'react';
import CheckBox from '@react-native-community/checkbox'; // Importando o novo CheckBox
import logo from '../assets/logo.png';

const { width, height } = Dimensions.get('window');  // Obter as dimensões da tela

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      senha: '',
      manterLogin: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={logo} 
          style={styles.logo}
        />
        <View style={styles.forms}>
          <Text style={styles.label}>Login:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu login"
            value={this.state.login}
            onChangeText={(text) => this.setState({ login: text })}
          />
        </View>
        <View style={styles.forms}>
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            value={this.state.senha}
            onChangeText={(text) => this.setState({ senha: text })}
          />
        </View>
        <View style={styles.forms}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <Text>Não possui conta?</Text>
        <TouchableOpacity style={styles.registerContainer}>
          <Text style={styles.registerText}>Cadastre-se!</Text>
        </TouchableOpacity>
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
  logo: {
    marginBottom: height * 0.05,  // Margin abaixo da logo em relação à altura da tela
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: width * 0.045,  // Tornando a fonte responsiva
    color: '#000',
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
  registerContainer: {
    marginTop: height * 0.02,  // Margin superior do botão "Cadastrar-se" será 2% da altura da tela
  },
  registerText: {
    color: '#4F7942',
    fontWeight: 'bold',
    fontSize: width * 0.045,  // O tamanho do texto será 4.5% da largura da tela
  },
});
