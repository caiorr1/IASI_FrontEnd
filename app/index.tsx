import React from 'react';
import { View } from 'react-native';
import { NavigationProvider, useNavigation } from './NavigationContext';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen'; 
import PasswordResetScreen from './PasswordResetScreen'; 
import AddIndustryScreen from './AddIndustryScreen';
import EditIndustryScreen from './EditIndustryScreen';
import '../global.css';

export default function Index() {
  return (
    <NavigationProvider>
      <Navigator />
    </NavigationProvider>
  );
}

function Navigator() {
  const { currentScreen } = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'Home' && <HomeScreen />}
      {currentScreen === 'Register' && <RegisterScreen />}
      {currentScreen === 'Login' && <LoginScreen />}
      {currentScreen === 'Dashboard' && <DashboardScreen />}
      {currentScreen === 'PasswordReset' && <PasswordResetScreen />} {/* Adiciona a tela de redefinição de senha */}
      {currentScreen === 'AddIndustry' && <AddIndustryScreen />} {/* Nova Tela */}
      {currentScreen === 'EditIndustry' && <EditIndustryScreen />} {/* Adiciona a tela de edição de indústria */}
    </View>
  );
}
