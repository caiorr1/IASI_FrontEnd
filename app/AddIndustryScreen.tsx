import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from './NavigationContext';

const AddIndustryScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [costReduction, setCostReduction] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState('');
  const [renewableEnergy, setRenewableEnergy] = useState('');
  const { navigateTo, authToken } = useNavigation();

  const handleAddIndustry = async () => {
    // Verifica se todos os campos estão preenchidos
    if (!name || !address || !efficiency || !costReduction || !carbonFootprint || !renewableEnergy) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/industrias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}` // Certifique-se de enviar o token de autenticação, se necessário
        },
        body: JSON.stringify({
          nome: name,
          endereco: address,
          eficiencia_geral: efficiency,
          reducao_gastos: costReduction,
          reducao_pegada_carbono: carbonFootprint,
          uso_energia_renovavel: renewableEnergy,
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Indústria adicionada com sucesso!');
        navigateTo('Dashboard'); // Volta para o Dashboard após adicionar
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.error || 'Erro ao adicionar a indústria');
      }
    } catch (error) {
      console.error('Erro ao adicionar a indústria:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Indústria</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Indústria"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Eficiência Geral (%)"
        value={efficiency}
        onChangeText={setEfficiency}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Redução de Gastos (%)"
        value={costReduction}
        onChangeText={setCostReduction}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Redução da Pegada de Carbono (%)"
        value={carbonFootprint}
        onChangeText={setCarbonFootprint}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Uso de Energia Renovável (%)"
        value={renewableEnergy}
        onChangeText={setRenewableEnergy}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddIndustry}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#245F54',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#245F54',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddIndustryScreen;
