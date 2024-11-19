import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';

const { width, height } = Dimensions.get('window'); // Obter as dimensões da tela

export default class Animal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnimal: null,
      animals: [
        { brinco: 1, nome: 'Exemplo1', cor: 'Branco', nascimento: '01/01/2000' },
        { brinco: 2, nome: 'Exemplo2', cor: 'Vermelho', nascimento: '01/01/2000' },
        { brinco: 3, nome: 'Exemplo3', cor: 'Branco', nascimento: '01/01/2000' },
        { brinco: 4, nome: 'Exemplo4', cor: 'Preto', nascimento: '01/01/2000' },
        { brinco: 5, nome: 'Exemplo5', cor: 'Branco', nascimento: '01/01/2000' },
        { brinco: 6, nome: 'Exemplo6', cor: 'Branco', nascimento: '01/01/2000' },
        { brinco: 7, nome: 'Exemplo7', cor: 'Branco', nascimento: '01/01/2000' },
      ],
    };
  }

  handleAnimalPress = (animal) => {
    this.setState({ selectedAnimal: animal });
    Alert.alert('Animal Selecionado', `Brinco: ${animal.brinco}, Nome: ${animal.nome}`);
  };

  renderTableRow = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => this.handleAnimalPress(item)}
      >
        <Text style={styles.cell}>{item.brinco}</Text>
        <Text style={styles.cell}>{item.nome}</Text>
        <Text style={styles.cell}>{item.cor}</Text>
        <Text style={styles.cell}>{item.nascimento}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.forms}>
          <Text style={styles.label}>Animal</Text>
          <TextInput style={styles.input} placeholder="Buscar pelo Nome" />
          <TextInput style={styles.input} placeholder="Buscar pela Numeração" />
          <TextInput style={styles.input} placeholder="Buscar pela Descrição" />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.animals}
          renderItem={this.renderTableRow}
          keyExtractor={(item) => item.brinco.toString()}
          ListHeaderComponent={
            <View style={styles.headerRow}>
              <Text style={[styles.cell, styles.headerText]}>Brinco</Text>
              <Text style={[styles.cell, styles.headerText]}>Nome</Text>
              <Text style={[styles.cell, styles.headerText]}>Cor</Text>
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
    borderColor: '#4F7942',
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#D3D3D3',
  },
  button: {
    backgroundColor: '#4F7942',
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
    backgroundColor: '#4F7942',
    paddingVertical: 10,
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
