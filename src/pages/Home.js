import { Text, StyleSheet, View, TextInput, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import React, { Component } from 'react';
import NavBar from '../components/Navbar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');  // Obter as dimensões da tela

const DATA = [
  { id: '1', titulo: 'Categoria A', contmacho: '3', contfemea: '42' },
  { id: '2', titulo: 'Categoria B', contmacho: '24', contfemea: '352'  },
  { id: '3', titulo: 'Categoria C', contmacho: '24', contfemea: '3'  },
  { id: '4', titulo: 'Categoria D', contmacho: '6', contfemea: '4' }, // descricao com 60 caracteres
  { id: '5', titulo: 'Categoria E', contmacho: '365', contfemea: '422' },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.title, { color: textColor }]}>{item.titulo}</Text>
    <Text>{item.descricao}</Text>
  </TouchableOpacity>
);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFarm: null,
    };
  }

  renderItem = ({ item }) => {
    const { selectedFarm } = this.state;
    const backgroundColor = item.id === selectedFarm ? '#4F7942' : '#ABBDAC';
    const color = item.id === selectedFarm ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => this.setState({ selectedFarm: item.id, selectedFarm: item })}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };


  render() {
    const { navigation } = this.props;
    const { selectedFarm } = this.state;
    return (

          <SafeAreaProvider>
        <NavBar></NavBar>
            <SafeAreaView style={styles.container}>
                <View style={styles.descriptionContainer}>
                    <View style={styles.descriptionContainerText}>
                        <Text style={styles.descriptionLabel}>Fazenda:</Text>
                        <Text style={styles.descriptionText}>
                        {selectedFarm ? selectedFarm.titulo : 'Nenhuma categoria selecionada'}
                        </Text>
                        <Text style={styles.descriptionLabel}>Machos:</Text>
                        <Text style={styles.descriptionText}>
                        {selectedFarm ? selectedFarm.contmacho : 'Nenhum macho'}
                        </Text>
                        <Text style={styles.descriptionLabel}>Femeas:</Text>
                        <Text style={styles.descriptionText}>
                        {selectedFarm ? selectedFarm.contfemea : 'Nenhum macho'}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.buttonText}>Ir</Text>
                        </TouchableOpacity>
                    </View>
              </View>
              <Text style={styles.label}>Lista de Fazendas</Text>

              <FlatList
                data={DATA}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
                extraData={this.state.selectedFarm}
                style={styles.lista}
              />

              <TouchableOpacity
                style={styles.buttonPlus}
                onPress={() => navigation.navigate('Fazendas')}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      width: '100%',
  },
  forms: {
    width: '60%',  // Define a largura tanto para o input quanto para o botão
  },
  label: {
    fontSize: width * 0.045,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    alignSelf: 'center',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#4D694E',
    width: '100%',
    padding: 10,
    marginBottom: height * 0.02,
  },
  descriptionContainerText: {
    flex: 1,
    marginTop: height * 0.02,
    width: '80%',
  },
  descriptionLabel: {
    fontSize: width * 0.045,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: width * 0.04,
    color: '#FFF',
    maxWidth: '100%',
    overflow: 'hidden',
    textAlign: 'left',
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
  buttonPlus: {
    backgroundColor: '#4F7942',
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
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
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: '90%',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  lista: {
    marginBottom: height * 0.02,
  },
});
