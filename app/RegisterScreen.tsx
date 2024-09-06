import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import InputComponent from '@/components/InputComponent';
import ButtonComponent from '@/components/ButtonComponent';
import { useNavigation } from './NavigationContext';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const RegisterScreen: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { navigateTo, setLastRegisteredEmail } = useNavigation();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
        'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        setLastRegisteredEmail(email); 
        navigateTo('Login');
      } else {
        Alert.alert('Erro', data.error || 'Erro no registro');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image 
            source={require('../assets/images/logoverde.png')} 
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>IASI</Text>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Já possui uma conta? 
          </Text>
          <Text style={styles.loginLink} onPress={() => navigateTo('Login')}> Login</Text>
        </View>
        <Text style={styles.title}>BEM-VINDO</Text>
        <Text style={styles.subtitle}>Sua solução para sustentabilidade industrial a qualquer momento, em qualquer lugar.</Text>
        
        <InputComponent
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ marginVertical: 20 }}
        />
        <InputComponent
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ marginVertical: 20 }}
        />
        <ButtonComponent 
          title="Criar conta" 
          onPress={handleRegister} 
          width={200} 
          fontSize={16} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  container: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  logoImage: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  logoText: {
    fontFamily: 'Space Age',
    fontSize: 40,
    fontWeight: '400',
    lineHeight: 40,
    color: '#15352F',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  loginText: {
    fontSize: 12,
    color: '#6c757d',
  },
  loginLink: {
    color: '#245F54',
    textDecorationLine: 'underline',
    textDecorationColor: '#245F54',
  },
  title: {
    fontFamily: 'Space Age',
    fontSize: 32,
    fontWeight: '400',
    lineHeight: 40,
    textAlign: 'left',
    color: '#15352F',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'left',
    color: '#0E312B',
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  input: {
    width: 336,
    height: 35.26,
    borderWidth: 1,
    borderColor: '#0E312B',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 100, // Aumenta o espaçamento entre os inputs
  },
});

export default RegisterScreen;
