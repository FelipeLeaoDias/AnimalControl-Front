import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, Dimensions, Alert, TouchableOpacity } from 'react-native';
import * as SecureStorage from 'expo-secure-store'
import { get } from '../utils/axios'

const { width, height } = Dimensions.get('window'); // Obter as dimensões da tela

export default class PerfilAnimal extends Component {
  constructor(props) {
    super(props);
    this.selectedAnimal = this.props.route.params.selectedAnimal;
    console.log(this.selectedAnimal)
    this.state = {
      animal: {
        name: 'Vakinha',
        label: '61',
        status: 'vivo', // Pode ser 'vivo', 'morto', 'vendido'
        sex: 'Fêmea',
        race: 'Girolando',
        color: 'Marrom',
        date_of_birth: '11/12/2015',
        date_of_death: '12/11/2020', // Para status 'morto'
        dataVenda: '11/12/2018', // Para status 'vendido'
        description: `O animal "Vakinha" é um excelente exemplar da raça Girolando, com uma pelagem marrom predominante. Ele tem um temperamento calmo e se adapta bem ao ambiente rural. Além disso, sua produção de leite é uma das melhores na fazenda, sendo constantemente monitorada para garantir que seus parâmetros de saúde sejam mantidos.`,
        average_production: '12', // Sem o "L" para facilitar a edição
      },
    };
  }

  refreshAnimalData = async () => {
    const token = await SecureStorage.getItemAsync("token")
    if (token == null) {
      alert("Você não está autenticado")
      await SecureStorage.deleteItemAsync(token)
      this.props.navigation.pop()
    }
    get('/animal/find/' + this.selectedAnimal.id, token)
      .then(data => {
        this.setState({ animal: data })
      })
      .catch(err => alert(err.message))
  }
  
  componentDidMount() {
    this.refreshAnimalData()
  }

  render() {
    const { animal, isEditingMedia, novoValorMediaLeite } = this.state;

    // Determina a label e data com base no status
    let dataLabel = '';
    let dataValue = '';

    // Mostrar campo de data apenas quando o status for 'morto' ou 'vendido'
    if (animal.status === 'morto') {
      dataLabel = 'Data de Morte:';
      dataValue = animal.date_of_death;
    } else if (animal.status === 'vendido') {
      dataLabel = 'Data de Venda:';
      dataValue = animal.dataVenda;
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.forms}>
          {/* name e Brinco */}
          <View style={styles.row}>
            <Text style={styles.label}>name:</Text>
            <Text style={styles.value}>{animal.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Número Brinco:</Text>
            <Text style={styles.value}>{animal.label}</Text>
          </View>

          {/* Status e sex */}
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{animal.status === 'morto' ? 'Morto' : animal.status === 'vendido' ? 'Vendido' : 'Vivo'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>sex:</Text>
            <Text style={styles.value}>{animal.sex}</Text>
          </View>

          {/* Raça e color */}
          <View style={styles.row}>
            <Text style={styles.label}>Raça:</Text>
            <Text style={styles.value}>{animal.race}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cor:</Text>
            <Text style={styles.value}>{animal.color}</Text>
          </View>

          {/* Data de Nascimento */}
          <View style={styles.row}>
            <Text style={styles.label}>Data de Nascimento:</Text>
            <Text style={styles.value}>{animal.date_of_birth}</Text>
          </View>

          {/* Exibe a Data de Morte ou Venda somente se o status for 'morto' ou 'vendido' */}
          {(animal.status === 'dead' || animal.status === 'selled') && (
            <View style={styles.row}>
              <Text style={styles.label}>{dataLabel}</Text>
              <Text style={styles.value}>{dataValue}</Text>
            </View>
          )}

          {/* Descrição */}
          <Text style={styles.label}>Descrição:</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>{animal.description}</Text>
          </View>

          {/* Divisória Verde */}
          <View style={styles.divider} />

          <Text style={styles.divisor}>Informações Gerenciais</Text>

          {/* Média de Leite Individual (aparece apenas para fêmeas) */}
          {animal.sex.toLowerCase() === 'female' && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Média de Leite Individual:</Text>
                {isEditingMedia ? (
                  <TextInput
                    style={styles.input}
                    value={novoValorMediaLeite}
                    onChangeText={text => this.setState({ novoValorMediaLeite: text })}
                    keyboardType="numeric"
                  />
                ) : (
                  <Text style={styles.value}>{animal.average_production}</Text> // Exibe o "L" automaticamente
                )}
              </View>

            </>
          )}

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    paddingBottom: 20, // Espaço extra para evitar que o conteúdo fique cortado
  },
  forms: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: width * 0.045, // Responsivo
    fontWeight: 'bold',
    color: '#000',
    width: '40%', // Ajuste a largura das labels para que fiquem consistentes
    textAlign: 'left', // Garante que as labels fiquem alinhadas à esquerda
  },
  value: {
    fontSize: width * 0.045,
    color: '#4D694E',
    textAlign: 'left', // Garante que os valores fiquem alinhados à esquerda
    width: '55%', // Ajuste a largura dos valores para que fiquem consistentes
  },
  input: {
    width: '55%',
    height: 40,
    borderColor: '#4D694E',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  descriptionBox: {
    padding: 10,
    backgroundColor: '#EAEAEA',
    borderRadius: 5,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: width * 0.045, // Responsivo
    color: '#4D694E',
    textAlign: 'justify', // Justifica o texto
  },
  divisor: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#4D694E', // cor verde para a divisória
    marginVertical: 20,
  },
  cardsContainer: {
    marginTop: 20,
  },
  cardTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  cardList: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#EAEAEA',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardText: {
    fontSize: width * 0.045,
    color: '#4D694E',
  },
});
