import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButton from '../components/RadioButton';
import Botao from '../components/Botao';
import * as ImagePicker from 'expo-image-picker'; // Usando Expo Image Picker

const { width, height } = Dimensions.get('window');

export default class CreateAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchNameText: '',
      searchLabelText: '', 
      descriptionText: '', 
      gender: '', 
      status: '', 
      birthDate: new Date(), 
      deathDate: new Date(), 
      saleDate: new Date(), 
      milkAverage: '', 
      showBirthDatePicker: false,
      showDeathDatePicker: false,
      showSaleDatePicker: false,
      photo: null, // Armazenando a foto selecionada
    };
  }

  // Função para selecionar a foto
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Força a imagem a ser quadrada
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ photo: result.uri });
    }
  };

  handleDateChange(event, selectedDate, type) {
    const currentDate = selectedDate || this.state[type];
    this.setState({ [type]: currentDate, [type === 'birthDate' ? 'showBirthDatePicker' : type === 'deathDate' ? 'showDeathDatePicker' : 'showSaleDatePicker']: false });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.forms}>
          {/* Campo de Nome */}
          <Text style={styles.label}>Nome</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite o Nome"
            onChangeText={(text) => this.setState({ searchNameText: text })}
          />

          {/* Campo de Gênero com RadioButton */}
          <Text style={styles.label}>Gênero</Text>
          <View style={styles.radioButtonGroup}>
            <RadioButton 
              label="Macho" 
              value="macho" 
              selectedValue={this.state.gender} 
              onSelect={(value) => this.setState({ gender: value })} 
            />
            <RadioButton 
              label="Fêmea" 
              value="femea" 
              selectedValue={this.state.gender} 
              onSelect={(value) => this.setState({ gender: value })} 
            />
          </View>

          {/* Campo de Status com RadioButton */}
          <Text style={styles.label}>Status</Text>
          <View style={styles.radioButtonGroup}>
            <RadioButton 
              label="Ativo" 
              value="ativo" 
              selectedValue={this.state.status} 
              onSelect={(value) => this.setState({ status: value })} 
            />
            <RadioButton 
              label="Inativo" 
              value="inativo" 
              selectedValue={this.state.status} 
              onSelect={(value) => this.setState({ status: value })} 
            />
            <RadioButton 
              label="Vendido" 
              value="vendido" 
              selectedValue={this.state.status} 
              onSelect={(value) => this.setState({ status: value })} 
            />
          </View>

          {/* Campo de Brinco */}
          <Text style={styles.label}>Brinco</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite o Brinco"
            keyboardType="numeric" 
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, '');
              this.setState({ searchLabelText: numericText });
            }}
          />
          <Text>Esse brinco já está sendo utilizado</Text>

          {/* Campo de Data de Nascimento */}
          <Text style={styles.label}>Data de Nascimento</Text>
          <TouchableOpacity style={styles.dateBox} onPress={() => this.setState({ showBirthDatePicker: true })}>
            <Text style={styles.dateText}>{this.state.birthDate.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {/* Exibe o DatePicker de falecimento se o status for "Inativo" */}
          {this.state.status === 'inativo' && (
            <>
              <Text style={styles.label}>Data de Falecimento</Text>
              <TouchableOpacity style={styles.dateBox} onPress={() => this.setState({ showDeathDatePicker: true })}>
                <Text style={styles.dateText}>{this.state.deathDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Exibe o DatePicker de venda se o status for "Vendido" */}
          {this.state.status === 'vendido' && (
            <>
              <Text style={styles.label}>Data de Venda</Text>
              <TouchableOpacity style={styles.dateBox} onPress={() => this.setState({ showSaleDatePicker: true })}>
                <Text style={styles.dateText}>{this.state.saleDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Exibe os pickers de data quando clicados */}
          {this.state.showBirthDatePicker && (
            <DateTimePicker
              value={this.state.birthDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => this.handleDateChange(event, selectedDate, 'birthDate')}
            />
          )}

          {this.state.showDeathDatePicker && (
            <DateTimePicker
              value={this.state.deathDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => this.handleDateChange(event, selectedDate, 'deathDate')}
            />
          )}

          {this.state.showSaleDatePicker && (
            <DateTimePicker
              value={this.state.saleDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => this.handleDateChange(event, selectedDate, 'saleDate')}
            />
          )}

          {/* Campo de Raça */}
          <Text style={styles.label}>Raça</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite a raça do animal"
            onChangeText={(text) => this.setState({ searchNameText: text })}
          />

          {/* Campo de Descrição do Animal */}
          <Text style={styles.label}>Descrição do Animal</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Insira a descrição do animal"
            multiline
            maxLength={100}
            onChangeText={(text) => this.setState({ descriptionText: text })}
            value={this.state.descriptionText}
          />
          <Text style={styles.characterCount}>{`${this.state.descriptionText.length}/100 caracteres`}</Text>

          {/* Campo de Média de Leite (Visível apenas para fêmea) */}
          {this.state.gender === 'femea' && (
            <>
              <Text style={styles.label}>Média de Leite</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Digite a média de leite" 
                keyboardType="numeric" 
                onChangeText={(text) => this.setState({ milkAverage: text })}
                value={this.state.milkAverage}
              />
            </>
          )}

          {/* Campo de Foto do Animal */}
          <Text style={styles.label}>Foto do Animal</Text>
          <TouchableOpacity style={styles.photoBox} onPress={this.pickImage}>
            {this.state.photo ? (
              <Image source={{ uri: this.state.photo }} style={styles.photo} />
            ) : (
              <Text style={styles.uploadText}>Selecione uma foto</Text>
            )}
          </TouchableOpacity>

          {/* Botão de Registro */}
          <Botao>Registrar</Botao>
        </View>
      </ScrollView>
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
    fontSize: width * 0.045,
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
    backgroundColor: '#fff',
  },
  descriptionInput: {
    height: height * 0.1,
    textAlignVertical: 'top',
  },
  radioButtonGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  dateBox: {
    width: '100%',
    height: height * 0.06,
    borderColor: '#4D694E',
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingRight: 10,
  },
  dateText: {
    fontSize: width * 0.04,
    color: '#4D694E',
  },
  characterCount: {
    fontSize: width * 0.035,
    color: '#4D694E',
    textAlign: 'right',
  },
  photoBox: {
    width: '100%',
    height: height * 0.25,
    borderColor: '#4D694E',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  uploadText: {
    color: '#4D694E',
    fontSize: width * 0.04,
  }
});
