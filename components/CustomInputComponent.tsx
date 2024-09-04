import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, TextInputProps, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputComponentProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  inputStyle?: ViewStyle;
}

const CustomInputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  inputStyle,
  ...rest
}) => {
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(!secureTextEntry);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{placeholder}</Text>
      </View>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          inputStyle,
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!isPasswordVisible && secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          underlineColorAndroid="transparent" // Remove sublinhado no Android
          selectionColor="transparent" // Remove a cor da seleção (se estiver presente)
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setPasswordVisibility(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={20}
              color="#0E312B"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth: 336,
    marginBottom: 20,
    position: 'relative',
    alignSelf: 'center',
  },
  labelContainer: {
    position: 'absolute',
    top: -8,
    left: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    zIndex: 10,
  },
  labelText: {
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#0E312B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#0E312B',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    height: 40,
  },
  inputContainerFocused: {
    borderColor: '#245F54',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0E312B',
    paddingVertical: 8,
    borderWidth: 0, // Remove qualquer borda interna
    backgroundColor: 'transparent', // Garante que o fundo seja transparente
  },
  iconContainer: {
    marginLeft: 8,
  },
});

export default CustomInputComponent;
