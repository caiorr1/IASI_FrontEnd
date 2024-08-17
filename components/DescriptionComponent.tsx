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
    alignItems: 'flex-start',  // Alinha à esquerda, de acordo com o novo layout
    marginBottom: 20,
    paddingHorizontal: 20,
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
