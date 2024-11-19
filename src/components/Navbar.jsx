import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const NavBar = () => {
  const navItems = [
    { name: 'Gestor', route: 'Gestor' },
    { name: 'Fazenda', route: 'Home' },
    { name: 'Financeiro', route: 'Financeiro' }
  ];
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.navBar}>
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.navBarItem,
            route.name === item.route && styles.selectedItem,
            screenWidth < 600 && styles.smallScreenItem,
          ]}
          onPress={() => {
            navigation.pop();
            navigation.navigate(item.route);
          }}
        >
          <Text
            style={[
              styles.navBarItemText,
              route.name === item.route && styles.selectedText,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#4D694E',
    maxWidth: Dimensions.get('window').width,
    borderBottomWidth: 2,
    borderColor: '#000',
  },
  navBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    backgroundColor: '#ABBDAC',
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  selectedItem: {
    backgroundColor: '#6a7e6a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  navBarItemText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
  },
  smallScreenItem: {
    flex: 1,
    minHeight: 40,
  },
});

export default NavBar;
