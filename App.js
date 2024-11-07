import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from './src/pages/Login';
import Cadastro from './src/pages/Cadastro';
import Home from './src/pages/Home';
import Fazendas from './src/pages/Fazendas';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Fazendas" component={Fazendas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
