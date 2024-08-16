import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DescriptionComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Inteligência Artificial de Sustentabilidade Industrial
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 287, // Ajuste de posição vertical
    left: 141, // Ajuste de posição horizontal
    width: 203,
    height: 96,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Lexend Giga', // Fonte Lexend Giga
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.05,
    textAlign: 'left',
    color: '#FFFFFF',
  },
});
