import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LogoComponent from '../components/LogoComponent';
import DescriptionComponent from '../components/DescriptionComponent';
import ButtonComponent from '../components/ButtonComponent';
import * as Font from 'expo-font';

export default function HomeScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Space Age': require('../assets/fonts/SpaceAge.ttf'),
        'Lexend Giga': require('@expo-google-fonts/lexend/Lexend_600SemiBold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Componente de fallback simples
  }

  return (
    <View style={styles.container}>
      <LogoComponent />
      <DescriptionComponent />
      <ButtonComponent 
        title="Criar conta" 
        onPress={() => console.log('Criar conta pressed')} 
        width={226} // Largura do botão
        fontSize={18} // Tamanho da fonte
      />
      <ButtonComponent 
        title="Login" 
        onPress={() => console.log('Login pressed')} 
        width={172} // Largura do botão
        fontSize={16} // Tamanho da fonte
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#245953',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
