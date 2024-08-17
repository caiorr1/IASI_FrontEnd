import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function LogoComponent() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>IASI</Text>
        <Text style={styles.description}>
          Inteligência Artificial de Sustentabilidade Industrial
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',  // Coloca o logo e o texto lado a lado
    alignItems: 'center',  // Centraliza verticalmente
    marginBottom: 20,
  },
  logo: {
    width: 111,  // Largura do logo conforme especificado
    height: 117, // Altura do logo conforme especificado
    marginRight: 20,  // Espaçamento entre o logo e o texto
  },
  textContainer: {
    width: 203,  // Largura do contêiner de texto
    height: 96,  // Altura do contêiner de texto
    justifyContent: 'center',
  },
  title: {
    fontSize: 64,
    fontFamily: 'Space Age', // Fonte Space Age
    fontWeight: '400',
    lineHeight: 64,
    textAlign: 'left',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Lexend Giga', // Fonte Lexend Giga
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.05,
    textAlign: 'left',  // Alinhamento à esquerda
    color: '#FFFFFF',
  },
});
