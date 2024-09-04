import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInputComponent from '@/components/CustomInputComponent';
import ButtonComponent from '@/components/ButtonComponent';
import { useNavigation } from './NavigationContext';

const screenWidth = Dimensions.get('window').width;

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { navigateTo, setLastRegisteredEmail } = useNavigation();

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
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Botão de Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigateTo('Home')}>
          <Ionicons name="arrow-back" size={24} color="#245F54" />
        </TouchableOpacity>

        {/* Logo e Título */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logoverde.png')} style={styles.logo} />
          <Text style={styles.logoText}>IASI</Text>
        </View>

        {/* Link de Login */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginTextGrey}>Já possui uma conta? </Text>
          <TouchableOpacity onPress={() => navigateTo('Login')}>
            <Text style={styles.loginTextLink}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Título de boas-vindas e descrição */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>BEM-VINDO</Text>
          <Text style={styles.descriptionText}>
            Sua solução para sustentabilidade industrial a qualquer momento, em qualquer lugar.
          </Text>
        </View>

        {/* Campos de Entrada */}
        <CustomInputComponent
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input} // Adiciona estilo corrigido para inputs
        />
        <CustomInputComponent
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input} // Adiciona estilo corrigido para inputs
        />

        {/* Botão Criar Conta */}
        <ButtonComponent 
          title="Criar conta" 
          onPress={handleRegister} 
          width={screenWidth * 0.8} 
          fontSize={18} 
        />

        {/* Separador */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Ou</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Botão Google */}
        <TouchableOpacity style={[styles.googleButton, { width: screenWidth * 0.8 }]}>
          <Text style={styles.googleButtonText}>Continuar com Google</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 5,
  },
  logoText: {
    fontFamily: 'Space Age',
    fontSize: 40,
    fontWeight: '400',
    lineHeight: 40,
    textAlign: 'left',
    color: '#15352F',
  },
  loginContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  loginTextGrey: {
    fontSize: 12,
    color: '#A9A9A9',
  },
  loginTextLink: {
    fontSize: 12,
    color: '#245F54',
    fontWeight: 'bold',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: 'Space Age',
    textAlign: 'center',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: 'Lato',
    textAlign: 'center',
    color: '#0E312B',
    maxWidth: 300,
    marginBottom: 20,
  },
  input: {
    width: screenWidth * 0.8, // Define a largura do input para 80% da largura da tela
    borderBottomWidth: 1,
    borderColor: '#0E312B',
    marginVertical: 10,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D3D3D3',
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#999',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 8,
  },
});

export default RegisterScreen;
