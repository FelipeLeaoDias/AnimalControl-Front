import React, { Component } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window'); // Obter as dimensões da tela

const DATA = [
  { id: '1', titulo: 'Fazenda A', descricao: 'fazenda 1 descricao pra testar a mais com 60' },
  { id: '2', titulo: 'Fazenda B', descricao: 'fazenda 2 descricao pra testar ate 60 caracteres' },
  { id: '3', titulo: 'Fazenda C', descricao: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
  { id: '4', titulo: 'Fazenda D', descricao: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' }, // descricao com 60 caracteres
  { id: '5', titulo: 'Fazenda E', descricao: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.title, { color: textColor }]}>{item.titulo}</Text>
    <Text>{item.descricao}</Text>
  </TouchableOpacity>
);

export default class Fazendas extends Component {
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
        <SafeAreaView style={styles.container}>
            <View style={styles.descriptionContainer}>
                <View style={styles.descriptionContainerText}>
                    <Text style={styles.descriptionLabel}>Fazenda:</Text>
                    <Text style={styles.descriptionText}>
                    {selectedFarm ? selectedFarm.titulo : 'Nenhuma fazenda selecionada'}
                    </Text>
                    <Text style={styles.descriptionLabel}>Descrição:</Text>
                    <Text style={styles.descriptionText}>
                    {selectedFarm ? selectedFarm.descricao : 'Sem descrição'}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Fazendas')}>
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Fazendas')}>
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
    buttonPlus: {
      backgroundColor: '#4F7942',
      width: width * 0.15,
      height: width * 0.15,
      borderRadius: (width * 0.15) / 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: height * 0.02,
    },
    buttonText: {
      color: '#fff',
      fontSize: width * 0.05,
      fontWeight: 'bold',
    },
    button: {
      width: '100%',
      backgroundColor: '#869687',
      paddingVertical: height * 0.02,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: height * 0.018,
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