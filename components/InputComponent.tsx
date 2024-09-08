import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputComponentProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: object;
  error?: boolean; // Adiciona uma propriedade para marcar o erro
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
  error = false,
}) => {
  const [isPasswordVisible, setPasswordVisibility] = React.useState<boolean>(!secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!isPasswordVisible && secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
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
    marginVertical: 8,
    width: '100%',
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    top: -12,
    left: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    zIndex: 10,
  },
  labelText: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#0E312B',
    textAlign: 'left',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#0E312B',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    height: 35.26,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0E312B',
    paddingVertical: 5,
  },
  iconContainer: {
    marginLeft: 8,
  },
  inputError: {
    borderColor: 'red',
  },
});

export default InputComponent;
