import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image, Dimensions, ToastAndroid } from 'react-native';
import React, { Component } from 'react';
import logo from '../assets/logo.png'; // Certifique-se que o caminho está correto
import CardInput from '../components/CardInput'
import { postSignUp } from '../utils/axios';
import { validateEmail } from '../utils/validate';

const { width, height } = Dimensions.get('window');  // Obter as dimensões da tela

export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        senha: '',
        senhaconfirm: '',
    };
  }

  handleCadastro = () => {
    const { email, senha, senhaconfirm } = this.state;

    if(validateEmail(email)){
      if (senha === senhaconfirm) {
        postSignUp(email, senha).then(data => {
          ToastAndroid.show("Usuario cadastrado com sucesso!", ToastAndroid.SHORT)
          this.props.navigation.navigate('Login')
        }).catch(err => {
          alert(err.message)
        })
      } else {
        alert("As senhas não coincidem ou campos estão vazios.");
      }
    }else{
      alert("O email submetido é inválido");
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <Image
          source={logo} 
          style={styles.logo}
        />

      <CardInput
        title="E-mail:"
        description="Digite seu E-mail"
        text={this.state.text}
        onChangeText={(text) => this.setState({email: text})}
      />

      <CardInput
        title="Senha:"
        description="Digite sua senha"
        secureTextEntry={true}
        text={this.state.senha}
        onChangeText={(text) => this.setState({ senha: text })}
      />

      <CardInput
        title="Confirme sua senha:"
        description="Confirme sua senha"
        secureTextEntry={true}
        text={this.state.senhaconfirm}
        onChangeText={(text) => this.setState({ senhaconfirm: text })}
      />

        <View style={styles.forms}>
          <TouchableOpacity style={styles.button} onPress={this.handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
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
  logo: {
    marginBottom: height * 0.05,  // Margin abaixo da logo em relação à altura da tela
    width: 100,  // Ajuste o tamanho da logo conforme necessário
    height: 100,
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
