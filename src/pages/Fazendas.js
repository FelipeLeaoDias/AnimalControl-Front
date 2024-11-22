import React, { Component } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
  Button
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {CreateFarmModal} from '../components/CreateFarmModal'
import {get, postAuth} from '../utils/axios'
import * as SecureStorage from 'expo-secure-store'

const { width, height } = Dimensions.get('window'); // Obter as dimensões da tela



const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.title, { color: textColor }]}>{item.name}</Text>
    <Text>{item.description}</Text>
  </TouchableOpacity>
);

export default class Fazendas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFarm: null,
      showModal: false,
      newFarmTitle: '',
      newFarmDescription: '',
      DATA: []
    };
  }

  refreshFarmData = async () => {
    const token = await SecureStorage.getItemAsync("token")
    if(token == null){
      alert("Você não está autenticado")
      await SecureStorage.deleteItemAsync(token)
      this.props.navigation.pop()
    }
    get('/farm', token)
      .then(data => {
        console.log(data) 
        this.setState({DATA: data}
      )})
      .catch(err => alert(err.message))
  }


  componentDidMount() {
    this.refreshFarmData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedFarm !== prevState.selectedFarm) {
      this.refreshFarmData()
    }
  }

  // Função para abrir o modal
  openModal = () => {
    this.setState({ showModal: true });
  };

  // Função para fechar o modal
  closeModal = () => {
    this.setState({ showModal: false, newFarmTitle: '', newFarmDescription: '' });
  };

  // Função para finalizar a criação da fazenda
  createFarm = async () => {
    const token = await SecureStorage.getItemAsync("token")
    if(token == null){
      alert("Você não está autenticado")
      await SecureStorage.deleteItemAsync(token)
      this.props.navigation.pop()
    }
    const { newFarmTitle, newFarmDescription } = this.state;
    if (newFarmTitle && newFarmDescription) {
      postAuth('/farm', 
        {name: newFarmTitle, description: newFarmDescription},
        token
      ).then(data => {
        this.closeModal()
        this.refreshFarmData()
      })
      .catch(err => alert(err.message))
    }
  };

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
    const { selectedFarm, showModal, newFarmTitle, newFarmDescription } = this.state;

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionContainerText}>
              <Text style={styles.descriptionLabel}>Fazenda:</Text>
              <Text style={styles.descriptionText}>
                {selectedFarm ? selectedFarm.name: 'Nenhuma fazenda selecionada'}
              </Text>
              <Text style={styles.descriptionLabel}>Descrição:</Text>
              <Text style={styles.descriptionText}>
                {selectedFarm ? selectedFarm.description : 'Sem descrição'}
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
            data={this.state.DATA}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            extraData={this.state.selectedFarm}
            style={styles.lista}
          />

          <TouchableOpacity style={styles.buttonPlus} onPress={this.openModal}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          <CreateFarmModal
            visible={this.state.showModal}
            onChangeFarmName={(text) => this.setState({ newFarmTitle: text })}
            onChangeFarmDescription={(text) => this.setState({ newFarmDescription: text })}
            closeModal={this.closeModal}
            createFarm={this.createFarm}
            newFarmTitle={this.state.newFarmTitle}
            newFarmDescription={this.state.newFarmDescription}
          />
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
  buttonModal: {
    width: '100%',
    backgroundColor: '#4D694E',
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
    width: '80%',
  },
});
