import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function LogoComponent() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>IASI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 267, // Ajuste de posição vertical
    left: 141, // Ajuste de posição horizontal
  },
  logo: {
    width: 137,
    height: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 64,
    fontFamily: 'Space Age', // Fonte Space Age
    fontWeight: '400',
    lineHeight: 40,
    textAlign: 'left',
    color: '#FFFFFF',
    width: 137,
    height: 40,
  },
});
