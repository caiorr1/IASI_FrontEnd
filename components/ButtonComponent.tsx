import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';

interface ButtonComponentProps {
  title: string;
  onPress: () => void;
  width: number;
  fontSize: number;
  disabled?: boolean; // Propriedade opcional para desabilitar o botão
  buttonStyle?: ViewStyle; // Estilos adicionais para o botão
  textStyle?: TextStyle; // Estilos adicionais para o texto
}

export default function ButtonComponent({
  title,
  onPress,
  width,
  fontSize,
  disabled = false,
  buttonStyle = {},
  textStyle = {},
}: ButtonComponentProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { width }, buttonStyle, disabled ? styles.disabled : null]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, { fontSize }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    backgroundColor: '#245953',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.3)',
      },
    }),
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Lexend Giga',
    textAlign: 'center',
  },
  disabled: { // Estilo para quando o botão está desabilitado
    backgroundColor: '#aaa', // Cor cinza para indicar desabilitado
  },
});
