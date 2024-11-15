import {Component} from 'react'
import {Dimensions, StyleSheet, TouchableOpacity, View, Modal, Text, TextInput} from 'react-native'

const { width, height } = Dimensions.get('window'); // Obter as dimensões da tela
export class CreateFarmModal extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Criando Fazenda</Text>

            <Text style={styles.modalLabel}>Nome</Text>
            <TextInput
              style={styles.modalInput}
              value={this.props.newFarmTitle}
              onChangeText={this.props.onChangeFarmName}
              placeholder="Digite o nome da fazenda"
            />

            <Text style={styles.modalLabel}>Descrição</Text>
            <TextInput
              style={styles.modalInput}
              value={this.props.newFarmDescription}
              onChangeText={this.props.onChangeFarmDescription}
              placeholder="Digite a descrição da fazenda"
            />

            <TouchableOpacity style={styles.buttonModal} onPress={this.props.createFarm}>
              <Text style={styles.buttonText}>Finalizar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonModal} onPress={this.props.closeModal}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  )}
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  buttonModal: {
    width: '100%',
    backgroundColor: '#4D694E',
    paddingVertical: height * 0.02,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: height * 0.018,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: width * 0.045,
    marginBottom: 5,
  },
  modalInput: {
    width: '100%',  // O input ocupará 100% da largura do componente forms
    height: height * 0.06,  // 6% da altura da tela
    borderColor: '#4F7942',
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 10,
    marginBottom: height * 0.03,  // Margin abaixo dos inputs será 3% da altura da tela
    backgroundColor: '#D3D3D3',
  },
});
