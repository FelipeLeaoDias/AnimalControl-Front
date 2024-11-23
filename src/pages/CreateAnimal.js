import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButton from '../components/RadioButton';
import Botao from '../components/Botao';
import * as ImagePicker from 'expo-image-picker';
import { postAuth } from '../utils/axios';
import * as SecureStorage from 'expo-secure-store'

const { width, height } = Dimensions.get('window');

export default class CreateAnimal extends Component {
  constructor(props) {
    super(props);
    this.selectedCate = this.props.route.params.selectedCate
    this.state = {
      average_production: '',
      name: '',
      label: '',
      race: '',
      color: '',
      description: '',
      gender: '',
      status: '',
      birthDate: new Date().toISOString().slice(0, 10), // Use Date object
      deathDate: new Date().toISOString().slice(0, 10),
      saleDate: new Date().toISOString().slice(0, 10),
      showBirthDatePicker: false,
      showDeathDatePicker: false,
      showSaleDatePicker: false,
      photo: null,
    };
  }

  // Image Picker Function
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ photo: result.uri });
    }
  };

  handleDateChange(event, selectedDate, type) {
    if (!selectedDate) {
      // User canceled the picker
      this.setState({
        [type === 'birthDate' ? 'showBirthDatePicker' : type === 'deathDate' ? 'showDeathDatePicker' : 'showSaleDatePicker']: false,
      });
      return;
    }

    const formattedDate = selectedDate.toISOString().slice(0, 10);
    this.setState({
      [type]: formattedDate,
      [type === 'birthDate' ? 'showBirthDatePicker' : type === 'deathDate' ? 'showDeathDatePicker' : 'showSaleDatePicker']: false,
    });
  }

  postAnimal = async () => {

    const token = await SecureStorage.getItemAsync("token");
    if (!token) {
      alert("Você não está autenticado");
      await SecureStorage.deleteItemAsync("token");
      this.props.navigation.pop();
      return;
    }

    const {
      name,
      label,
      description,
      gender,
      birthDate,
      deathDate,
      race,
      color,
      average_production,
    } = this.state;

    if(!gender){
      alert("Escolha o sexo do animal")
      return;
    }
    postAuth(
      '/animal',
      {
        name,
        label,
        description,
        sex: gender,
        race,
        color,
        dateOfBirth: birthDate,
        dateOfDeath: deathDate,
        averageProduction: parseInt(average_production),
        categoryId: this.selectedCate.id,
      },
      token
    )
      .then((data) => {
        this.props.navigation.pop();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.forms}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o Nome"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <Text style={styles.label}>Gênero</Text>
          <View style={styles.radioButtonGroup}>
            <RadioButton
              label="Macho"
              value="male"
              selectedValue={this.state.gender}
              onSelect={(value) => this.setState({ gender: value })}
            />
            <RadioButton
              label="Fêmea"
              value="female"
              selectedValue={this.state.gender}
              onSelect={(value) => this.setState({ gender: value })}
            />
          </View>

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

          <Text style={styles.label}>Brinco</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o Brinco"
            onChangeText={(text) => this.setState({ label: text })}
          />

          <Text style={styles.label}>Raça</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a Raça"
            onChangeText={(text) => this.setState({ race: text })}
          />

          <Text style={styles.label}>Cor</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a Cor"
            onChangeText={(text) => this.setState({ color: text })}
          />

          <Text style={styles.label}>Media de Produçao</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a Média de Produção"
            keyboardType='numeric'
            onChangeText={(text) => this.setState({ average_production: text })}
          />

          <Text style={styles.label}>Data de Nascimento</Text>
          <TouchableOpacity style={styles.dateBox} onPress={() => this.setState({ showBirthDatePicker: true })}>
            <Text style={styles.dateText}>{this.state.birthDate}</Text>
          </TouchableOpacity>

          {this.state.status === 'inativo' && (
            <>
              <Text style={styles.label}>Data de Falecimento</Text>
              <TouchableOpacity style={styles.dateBox} onPress={() => this.setState({ showDeathDatePicker: true })}>
                <Text style={styles.dateText}>{this.state.deathDate}</Text>
              </TouchableOpacity>
            </>
          )}

          {this.state.status === 'vendido' && (
            <>
              <Text style={styles.label}>Data de Venda</Text>
              <TouchableOpacity style={styles.dateBox} onPress={() => this.setState({ showSaleDatePicker: true })}>
                <Text style={styles.dateText}>{this.state.saleDate}</Text>
              </TouchableOpacity>
            </>
          )}

          {this.state.showBirthDatePicker && (
            <DateTimePicker
              value={new Date(this.state.birthDate)}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => this.handleDateChange(event, selectedDate, 'birthDate')}
            />
          )}

          {this.state.showDeathDatePicker && (
            <DateTimePicker
              value={new Date(this.state.deathDate)}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => this.handleDateChange(event, selectedDate, 'deathDate')}
            />
          )}

          {this.state.showSaleDatePicker && (
            <DateTimePicker
              value={new Date(this.state.saleDate)}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => this.handleDateChange(event, selectedDate, 'saleDate')}
            />
          )}

          <Text style={styles.label}>Descrição do Animal</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Insira a descrição do animal"
            multiline
            maxLength={100}
            onChangeText={(text) => this.setState({ description: text })}
            value={this.state.description}
          />
          <Text style={styles.characterCount}>{`${this.state.description.length}/100 caracteres`}</Text>

          <Botao onPress={() => {
            this.postAnimal()
          }}>Registrar</Botao>
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
