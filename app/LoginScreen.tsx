import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InputComponent from '@/components/InputComponent';
import ButtonComponent from '@/components/ButtonComponent';
import { useNavigation } from './NavigationContext';

const LoginScreen: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const { navigateTo, lastRegisteredEmail } = useNavigation();
  const [email, setEmail] = useState<string>(lastRegisteredEmail || '');

  const handleLogin = async () => {
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
        navigateTo('Dashboard'); 
      } else {
        Alert.alert('Erro', data.error || 'Erro no login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigateTo('Home')}>
        <Ionicons name="arrow-back" size={24} color="#245F54" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Login</Text>
      <InputComponent
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <InputComponent
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <ButtonComponent 
        title="Login" 
        onPress={handleLogin} 
        width={200} 
        fontSize={18} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centraliza o texto do cabeçalho
  },
});

export default LoginScreen;
