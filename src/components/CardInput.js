import { React, Component } from 'react'
import { Text, StyleSheet, View, TextInput, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');  // Obter as dimensões da tela

export default class Cadastro extends Component {
  constructor(props) {
    super(props);
  }


  render(){
    return(
      <View style={styles.forms}>
        <Text style={styles.label}>{this.props.title}</Text>
        <TextInput
          style={styles.input}
          placeholder={this.props.description}
          value={this.props.text}
          secureTextEntry={this.props.secureTextEntry}
          onChangeText={this.props.onChangeText}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  }
})
