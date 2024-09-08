import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

export default function LogoComponent() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Lexend-Giga-SemiBold': require('../assets/fonts/LexendGiga-SemiBold.ttf'),
        'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 111,
    height: 117,
    marginRight: 10,
  },
  textContainer: {
    width: 203,
    height: 96,
    justifyContent: 'center',
  },
  title: {
    fontSize: 70,
    fontFamily: 'Space Age', // Fonte Lexend Giga SemiBold
    lineHeight: 60,
    textAlign: 'left',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 12,
    fontFamily: 'Lexend-Giga-SemiBold', // Fonte Lato Bold
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.05,
    textAlign: 'left',
    color: '#FFFFFF',
  },
});
