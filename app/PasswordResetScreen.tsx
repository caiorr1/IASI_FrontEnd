import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import InputComponent from '@/components/InputComponent';
import ButtonComponent from '@/components/ButtonComponent';
import { useNavigation } from './NavigationContext';
import * as Font from 'expo-font';

const PasswordResetScreen: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { navigateTo } = useNavigation();

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

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/redefinir-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
        navigateTo('Login');
      } else {
        Alert.alert('Erro', data.error || 'Erro ao redefinir senha');
      }
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
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
        <Text style={styles.subtitle}>
          Preencha os campos abaixo para <Text style={styles.linkText}>redefinir sua senha.</Text>
        </Text>

        <InputComponent
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ marginVertical: 20 }} // Espaçamento entre os inputs
        />
        <InputComponent
          label="Nova senha"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          style={{ marginVertical: 20 }} // Espaçamento entre os inputs
        />
        <InputComponent
          label="Confirme a nova senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={{ marginVertical: 20 }} // Espaçamento entre os inputs
        />
        <ButtonComponent 
          title="Redefinir Senha" 
          onPress={handlePasswordReset} 
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
  subtitle: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'left',
    color: '#0E312B',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  linkText: {
    color: '#245F54',
    textDecorationLine: 'underline',
  },
});

export default PasswordResetScreen;
