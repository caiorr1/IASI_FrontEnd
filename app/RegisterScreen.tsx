import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import InputComponent from '@/components/InputComponent';
import ButtonComponent from '@/components/ButtonComponent';
import { useNavigation } from './NavigationContext';
import { Ionicons } from '@expo/vector-icons'; // Import do ícone de exclamação
import * as Font from 'expo-font';

const RegisterScreen: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
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
    setErrorMessage(null);
    setEmailError(false);
    setPasswordError(false);

    if (!email.includes('@')) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      setEmailError(true);
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      setPasswordError(true);
      return;
    }

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
        if (data.error && data.error.includes('UNIQUE constraint failed')) {
          setErrorMessage('O e-mail já está registrado. Por favor, use outro e-mail.');
          setEmailError(true);
        } else {
          setErrorMessage(data.error || 'Erro no registro');
        }
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setErrorMessage('Não foi possível conectar ao servidor.');
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
        
        {errorMessage && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={18} color="red" style={styles.errorIcon} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        <InputComponent
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ marginVertical: 20 }}
          error={emailError}
        />
        <InputComponent
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ marginVertical: 20 }}
          error={passwordError}
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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: 11,
  },
  errorIcon: {
    marginRight: 5,
  },
});

export default RegisterScreen;
