import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from './NavigationContext';

const EditIndustryScreen: React.FC = () => {
  const { navigateTo, screenParams, authToken } = useNavigation();
  const [nome, setNome] = useState<string>(screenParams?.industry?.nome || '');
  const [endereco, setEndereco] = useState<string>(screenParams?.industry?.endereco || '');
  const [eficienciaGeral, setEficienciaGeral] = useState<string>(String(screenParams?.industry?.eficiencia_geral || ''));
  const [reducaoGastos, setReducaoGastos] = useState<string>(String(screenParams?.industry?.reducao_gastos || ''));
  const [reducaoPegadaCarbono, setReducaoPegadaCarbono] = useState<string>(String(screenParams?.industry?.reducao_pegada_carbono || ''));
  const [usoEnergiaRenovavel, setUsoEnergiaRenovavel] = useState<string>(String(screenParams?.industry?.uso_energia_renovavel || ''));

  const handleUpdateIndustry = async () => {
    try {
      const response = await fetch(`http://localhost:3000/industrias/${screenParams.industry.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          nome,
          endereco,
          eficiencia_geral: parseInt(eficienciaGeral, 10),
          reducao_gastos: parseInt(reducaoGastos, 10),
          reducao_pegada_carbono: parseInt(reducaoPegadaCarbono, 10),
          uso_energia_renovavel: parseInt(usoEnergiaRenovavel, 10),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Indústria atualizada com sucesso!');
        navigateTo('Dashboard');
      } else {
        Alert.alert('Erro', data.error || 'Erro ao atualizar indústria.');
      }
    } catch (error) {
      console.error('Erro ao atualizar indústria:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Indústria</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Indústria"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Eficiência Geral (%)"
        keyboardType="numeric"
        value={eficienciaGeral}
        onChangeText={setEficienciaGeral}
      />
      <TextInput
        style={styles.input}
        placeholder="Redução de Gastos (%)"
        keyboardType="numeric"
        value={reducaoGastos}
        onChangeText={setReducaoGastos}
      />
      <TextInput
        style={styles.input}
        placeholder="Redução da Pegada de Carbono (%)"
        keyboardType="numeric"
        value={reducaoPegadaCarbono}
        onChangeText={setReducaoPegadaCarbono}
      />
      <TextInput
        style={styles.input}
        placeholder="Uso de Energia Renovável (%)"
        keyboardType="numeric"
        value={usoEnergiaRenovavel}
        onChangeText={setUsoEnergiaRenovavel}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateIndustry}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
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
    color: '#15352F',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 4,
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

export default EditIndustryScreen;
