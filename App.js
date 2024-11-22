import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/Login';
import Cadastro from './src/pages/Cadastro';
import Home from './src/pages/Home';
import Fazendas from './src/pages/Fazendas';
import Gestor from './src/pages/Gestor';
import Financeiro from './src/pages/Financeiro';
import Animal from './src/pages/Animal';
import CreateAnimal from './src/pages/CreateAnimal';
import PerfilAnimal from './src/pages/PerfilAnimal';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{

          animation: "none",
          animationDuration: null,
          headerStyle: {
            backgroundColor: '#4D694E', // Define a cor do fundo da navbar
          },
          headerTintColor: '#fff', // Define a cor do texto e dos ícones na navbar
          headerTitleStyle: {
            fontWeight: 'bold', // Opcional: estilo do título
          },
        }}
      >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Fazendas" component={Fazendas} options={{
          headerBackVisible: false,
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={({ navigation }) => ({ 
            title: 'Fazenda',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen 
          name="Gestor" 
          component={Gestor} 
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen 
          name="Financeiro" 
          component={Financeiro} 
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Animal"
          component={Animal}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          title="Registro"
          name="CreateAnimal"
          component={CreateAnimal}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          title="Perfil"
          name="PerfilAnimal"
          component={PerfilAnimal}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 15, // Ajusta a posição do botão no header
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
