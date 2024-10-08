import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import InputComponent from '@/components/InputComponent';
import ButtonComponent from '@/components/ButtonComponent';
import { useNavigation } from './NavigationContext';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const LoginScreen: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { navigateTo, setAuthToken } = useNavigation();

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

  const handleLogin = async () => {
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage(null);

    if (!email.trim()) {
      setEmailError(true);
      setErrorMessage('O campo de e-mail está vazio.');
      return;
    }

    if (!password.trim()) {
      setPasswordError(true);
      setErrorMessage('O campo de senha está vazio.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        setAuthToken(data.token);
        navigateTo('Dashboard');
      } else {
        if (data.error.includes('usuários.email')) {
          setEmailError(true);
          setErrorMessage('E-mail ou senha inválidos');
        } else {
          setErrorMessage(data.error || 'Erro no login');
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
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
            Ainda não possui uma conta?
          </Text>
          <Text style={styles.loginLink} onPress={() => navigateTo('Register')}> Criar conta</Text>
        </View>
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
          title="Login" 
          onPress={handleLogin} 
          width={200} 
          fontSize={16} 
        />
        <TouchableOpacity onPress={() => navigateTo('PasswordReset')}>
          <Text style={styles.forgotPassword}>
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>
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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
  },
  errorIcon: {
    marginRight: 5,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#245F54',
    textDecorationLine: 'underline',
    textDecorationColor: '#245F54',
    marginTop: 15,
  },
});

export default LoginScreen;
