import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, Dimensions, Alert, TouchableOpacity } from 'react-native';
import Botao from '../components/Botao';

const { width, height } = Dimensions.get('window'); // Obter as dimensões da tela

export default class PerfilAnimal extends Component {
  constructor(props) {
    super(props);
    // Criando um objeto para armazenar as informações do animal
    this.state = {
      animal: {
        nome: 'Vakinha',
        numeroBrinco: '61',
        status: 'vivo', // Pode ser 'vivo', 'morto', 'vendido'
        sexo: 'Fêmea',
        raca: 'Girolando',
        cor: 'Marrom',
        dataNascimento: '11/12/2015',
        dataMorte: '12/11/2020', // Para status 'morto'
        dataVenda: '11/12/2018', // Para status 'vendido'
        descricao: `O animal "Vakinha" é um excelente exemplar da raça Girolando, com uma pelagem marrom predominante. Ele tem um temperamento calmo e se adapta bem ao ambiente rural. Além disso, sua produção de leite é uma das melhores na fazenda, sendo constantemente monitorada para garantir que seus parâmetros de saúde sejam mantidos.`,
        mediaLeiteIndividual: '12', // Sem o "L" para facilitar a edição
        mediaLeiteFazenda: '10L',
        mediaLeiteCategoria: '11L',
        pai: { nome: 'Boazinho', numeroBrinco: '45' }, // Exemplo de pai
        mae: { nome: 'Margarida', numeroBrinco: '32' }, // Exemplo de mãe
        filhos: [
          { nome: 'Filhote A', numeroBrinco: '100' },
          { nome: 'Filhote B', numeroBrinco: '101' },
          { nome: 'Filhote A', numeroBrinco: '100' },
          { nome: 'Filhote B', numeroBrinco: '101' },
        ], // Lista de filhos
      },
      isEditingMedia: false, // Flag para controlar quando estamos no modo de edição
      novoValorMediaLeite: '', // Valor temporário para a nova média de leite
    };
  }

  // Função para alternar o modo de edição
  toggleEditMedia = () => {
    this.setState(prevState => ({
      isEditingMedia: !prevState.isEditingMedia,
      novoValorMediaLeite: this.state.animal.mediaLeiteIndividual, // Preencher com o valor atual
    }));
  };

  // Função para atualizar a média de leite individual
  handleSaveMediaLeite = () => {
    const { novoValorMediaLeite } = this.state;
    if (novoValorMediaLeite.trim() === '') {
      Alert.alert('Erro', 'O valor da média de leite não pode estar vazio.');
      return;
    }

    // Atualizar o estado do animal com o novo valor (adicionando "L" automaticamente)
    this.setState(prevState => ({
      animal: {
        ...prevState.animal,
        mediaLeiteIndividual: novoValorMediaLeite + 'L', // Adicionando "L" automaticamente
      },
      isEditingMedia: false, // Sair do modo de edição
    }));
  };

  // Função para tratar o clique no card do pai, mãe ou filho
  handleCardClick = (animal) => {
    Alert.alert('Animal Selecionado', `Você selecionou ${animal.nome} (Brinco: ${animal.numeroBrinco})`);
  };

  render() {
    const { animal, isEditingMedia, novoValorMediaLeite } = this.state;

    // Determina a label e data com base no status
    let dataLabel = '';
    let dataValue = '';

    // Mostrar campo de data apenas quando o status for 'morto' ou 'vendido'
    if (animal.status === 'morto') {
      dataLabel = 'Data de Morte:';
      dataValue = animal.dataMorte;
    } else if (animal.status === 'vendido') {
      dataLabel = 'Data de Venda:';
      dataValue = animal.dataVenda;
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.forms}>
          {/* Nome e Brinco */}
          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{animal.nome}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Número Brinco:</Text>
            <Text style={styles.value}>{animal.numeroBrinco}</Text>
          </View>

          {/* Status e Sexo */}
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{animal.status === 'morto' ? 'Morto' : animal.status === 'vendido' ? 'Vendido' : 'Vivo'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sexo:</Text>
            <Text style={styles.value}>{animal.sexo}</Text>
          </View>

          {/* Raça e Cor */}
          <View style={styles.row}>
            <Text style={styles.label}>Raça:</Text>
            <Text style={styles.value}>{animal.raca}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cor:</Text>
            <Text style={styles.value}>{animal.cor}</Text>
          </View>

          {/* Data de Nascimento */}
          <View style={styles.row}>
            <Text style={styles.label}>Data de Nascimento:</Text>
            <Text style={styles.value}>{animal.dataNascimento}</Text>
          </View>

          {/* Exibe a Data de Morte ou Venda somente se o status for 'morto' ou 'vendido' */}
          {(animal.status === 'morto' || animal.status === 'vendido') && (
            <View style={styles.row}>
              <Text style={styles.label}>{dataLabel}</Text>
              <Text style={styles.value}>{dataValue}</Text>
            </View>
          )}

          {/* Descrição */}
          <Text style={styles.label}>Descrição:</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>{animal.descricao}</Text>
          </View>

          {/* Divisória Verde */}
          <View style={styles.divider} />

          <Text style={styles.divisor}>Informações Gerenciais</Text>

          {/* Média de Leite Individual (aparece apenas para fêmeas) */}
          {animal.sexo === 'Fêmea' && (
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
                  <Text style={styles.value}>{animal.mediaLeiteIndividual}</Text> // Exibe o "L" automaticamente
                )}
              </View>

              <Botao onPress={this.toggleEditMedia}>
                {isEditingMedia ? 'Cancelar Edição' : 'Editar Média Individual'}
              </Botao>
              {isEditingMedia && (
                <Botao onPress={this.handleSaveMediaLeite}>
                  Salvar Média Individual
                </Botao>
              )}
            </>
          )}

          {/* Média de Leite da Fazenda */}
          <View style={styles.row}>
            <Text style={styles.label}>Média de Leite da Fazenda:</Text>
            <Text style={styles.value}>{animal.mediaLeiteFazenda}</Text>
          </View>

          {/* Média de Leite da Categoria */}
          <View style={styles.row}>
            <Text style={styles.label}>Média de Leite da Categoria:</Text>
            <Text style={styles.value}>{animal.mediaLeiteCategoria}</Text>
          </View>

          {/* Listas de Pais e Filhos */}
          <View style={styles.cardsContainer}>
            <Text style={styles.cardTitle}>Pais</Text>
            <View style={styles.cardList}>
              {/* Card do Pai */}
              <TouchableOpacity style={styles.card} onPress={() => this.handleCardClick(animal.pai)}>
                <Text style={styles.cardText}>Pai: {animal.pai.nome} - Brinco: {animal.pai.numeroBrinco}</Text>
              </TouchableOpacity>
              {/* Card da Mãe */}
              <TouchableOpacity style={styles.card} onPress={() => this.handleCardClick(animal.mae)}>
                <Text style={styles.cardText}>Mãe: {animal.mae.nome} - Brinco: {animal.mae.numeroBrinco}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.cardTitle}>Filhos</Text>
            <View style={styles.cardList}>
              {animal.filhos.map((filho, index) => (
                <TouchableOpacity key={index} style={styles.card} onPress={() => this.handleCardClick(filho)}>
                  <Text style={styles.cardText}>Filho: {filho.nome} Brinco: {filho.numeroBrinco}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

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
    backgroundColor: '#4D694E', // Cor verde para a divisória
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
