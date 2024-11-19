import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { Component } from 'react';
import logo from '../assets/logo.png';
import CardInput from '../components/CardInput'
import * as SecureStorage from 'expo-secure-store'

import {postLogin} from '../utils/axios'

const { width, height } = Dimensions.get('window');  // Obter as dimensões da tela

const doLogin = (email, password, navigation) => {
  postLogin(email, password).then(resp => {
    SecureStorage.setItem('token', resp.token)
    navigation.navigate('Fazendas')
  }).catch(err => {
    alert(err.message)
  })
}

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
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={logo} 
          style={styles.logo}
        />

        <CardInput
          title="Login:"
          description="Digite seu login"
          text={this.state.login}
          onChangeText={(text) => this.setState({ login: text })}
        />

        <CardInput
          title="Senha:"
          description="Digite sua senha"
          secureTextEntry={true}
          text={this.state.senha}
          onChangeText={(text) => this.setState({ senha: text })}
        />

        <View style={styles.forms}>
          <TouchableOpacity style={styles.button} onPress={() => 
            doLogin(this.state.login, this.state.senha, navigation)}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.forms}>
        <TouchableOpacity style={styles.registerContainer} onPress={() => navigation.navigate('Fazendas')}>
          <Text style={styles.registerText}>SemLogin</Text>
        </TouchableOpacity>
        </View>

        <Text>Não possui conta?</Text>
        <TouchableOpacity style={styles.registerContainer} onPress={() => navigation.navigate('Cadastro')}>
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
