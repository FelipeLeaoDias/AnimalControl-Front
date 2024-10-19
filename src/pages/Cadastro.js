import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { Component } from 'react';
import logo from '../assets/logo.png'; // Certifique-se que o caminho está correto

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

    // Exemplo simples de validação
    if ( senha === senhaconfirm) {
      // Redireciona para a página de Login após o cadastro
      this.props.navigation.navigate('Login');
    } else {
      alert("As senhas não coincidem ou campos estão vazios.");
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <Image
          source={logo} 
          style={styles.logo}
        />

        <View style={styles.forms}>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu E-mail"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
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
          <Text style={styles.label}>Confirme sua senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            secureTextEntry={true}
            value={this.state.senhaconfirm}
            onChangeText={(text) => this.setState({ senhaconfirm: text })}
          />
        </View>

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
