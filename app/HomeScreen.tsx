import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LogoComponent from '../components/LogoComponent';
import ButtonComponent from '../components/ButtonComponent';
import * as Font from 'expo-font';
import { useNavigation } from './NavigationContext'; // Importe o contexto de navegação

export default function HomeScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { navigateTo } = useNavigation(); // Usa o hook para acessar a função de navegação

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Space Age': require('../assets/fonts/SpaceAge.ttf'),
        'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Componente de fallback simples enquanto as fontes carregam
  }

  return (
    <View style={styles.container}>
      <LogoComponent />
      <View style={styles.buttonContainer}>
        <ButtonComponent 
          title="Criar conta" 
          onPress={() => navigateTo('Register')} // Navega para a tela de registro
          width={226} 
          fontSize={18}
          buttonStyle={styles.homeButton}
        />
        <ButtonComponent 
          title="Login" 
          onPress={() => navigateTo('Login')} // Navega para a tela de login
          width={172} 
          fontSize={16}
          buttonStyle={styles.homeButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#245F54', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, 
  },
  buttonContainer: {
    marginTop: 20, 
    alignItems: 'center', 
  },
  homeButton: {
    backgroundColor: '#214D45',
  }
});
