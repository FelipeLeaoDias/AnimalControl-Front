import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import * as SecureStorage from 'expo-secure-store'
import {get} from '../utils/axios'
import Botao from '../components/Botao';

const { width, height } = Dimensions.get('window'); // Obter as dimensões da tela

export default class Animal extends Component {
  constructor(props) {
    super(props);
    this.selectedCate = this.props.route.params.selectedCate
    console.log(this.selectedCate)
    this.state = {
      selectedAnimal: null,
      animals: [],
      searchNameText: "",
      searchLabelText: ""
    };
  }

  handleAnimalPress = (animal) => {
    this.setState({ selectedAnimal: animal });
    Alert.alert('Animal Selecionado', `Brinco: ${animal.label}, Nome: ${animal.name}`);
  };

  renderTableRow = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => this.handleAnimalPress(item)}
      >
        <Text style={styles.cell}>{item.label}</Text>
        <Text style={styles.cell}>{item.name}</Text>
        <Text style={styles.cell}>{item.date_of_birth}</Text>
      </TouchableOpacity>
    );
  };

  refreshCatleData = async () => {
    const token = await SecureStorage.getItemAsync("token")
    if(token == null){
      alert("Você não está autenticado")
      await SecureStorage.deleteItemAsync(token)
      this.props.navigation.pop()
    }
    get('/animal/'+this.selectedCate.id, token)
      .then(data => {
        this.setState({animals: data})
      })
      .catch(err => alert(err.message))
  }

  searchAnimal = async () => {
    const token = await SecureStorage.getItemAsync("token")
    if(token == null){
      alert("Você não está autenticado")
      await SecureStorage.deleteItemAsync(token)
      this.props.navigation.pop()
    }
    get('/animal/'+this.selectedCate.id+'/query?name='+this.state.searchNameText+'&label='+this.state.searchLabelText, token)
      .then(data => {
        console.log(data)
        this.setState({animals: data})
      })
      .catch(err => alert(err.message))
  }

  componentDidMount() {
    this.refreshCatleData()
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.forms}>
          <Botao onPress={() => navigation.navigate('CreateAnimal')}>Registrar Animal</Botao>
          <Text style={styles.label}>Animal</Text>
          <TextInput style={styles.input} placeholder="Buscar pelo Nome"
          onChangeText={(text) => this.setState({ searchNameText: text })}
          />
          <TextInput style={styles.input} placeholder="Buscar pelo Brinco"
          onChangeText={(text) => this.setState({ searchLabelText: text })}
          />
          <Botao onPress={()=>{this.searchAnimal()}}>Buscar</Botao>
        </View>

        <FlatList
          data={this.state.animals}
          renderItem={this.renderTableRow}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.headerRow}>
              <Text style={[styles.cell, styles.headerText]}>Brinco</Text>
              <Text style={[styles.cell, styles.headerText]}>Nome</Text>
              <Text style={[styles.cell, styles.headerText]}>Nascimento</Text>
            </View>
          }
        />
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
