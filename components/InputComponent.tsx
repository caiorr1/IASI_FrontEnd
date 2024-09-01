import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  placeholder: string;
}

const InputComponent: React.FC<InputProps> = ({ placeholder, ...rest }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    {...rest}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 15,
  }
});

export default InputComponent;
