import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from './NavigationContext';

const DashboardScreen: React.FC = () => {
  const { navigateTo } = useNavigation();

  const industries = [
    {
      name: 'Indústria X',
      address: 'Endereço',
      data: {
        efficiency: '85%',
        costReduction: '34%',
        carbonFootprint: '22%',
        renewableEnergy: '76%',
      },
    },
    // Adicione outras indústrias conforme necessário
  ];

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Ionicons name="arrow-back" size={24} color="#245F54" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color="#245F54" />
        </TouchableOpacity>
      </View>

      {/* Lista de Indústrias */}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Suas posses</Text>
        <TouchableOpacity style={styles.addIndustryButton} onPress={() => console.log('Adicionar Indústria')}>
          <Ionicons name="add-circle-outline" size={20} color="#245F54" />
          <Text style={styles.addIndustryText}>Adicionar</Text>
        </TouchableOpacity>
        
        {industries.map((industry, index) => (
          <View key={index} style={styles.industryCard}>
            <Text style={styles.industryName}>{industry.name}</Text>
            <Text style={styles.industryAddress}>{industry.address}</Text>
            <View style={styles.industryData}>
              <Text style={styles.dataText}>Eficiência Geral: {industry.data.efficiency}</Text>
              <Text style={styles.dataText}>Redução de gastos: {industry.data.costReduction}</Text>
              <Text style={styles.dataText}>Redução da pegada de carbono: {industry.data.carbonFootprint}</Text>
              <Text style={styles.dataText}>Uso de energia renovável: {industry.data.renewableEnergy}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Barra de Navegação Inferior */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigateTo('Dashboard')} style={styles.footerButton}>
          <Ionicons name="home-outline" size={24} color="#245F54" />
          <Text style={styles.footerText}>Dashboard</Text>
        </TouchableOpacity>
        {/* Removendo a opção de tela Analysis */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: 'Space Age',
    fontSize: 18,
    color: '#15352F',
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#15352F',
  },
  addIndustryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addIndustryText: {
    color: '#245F54',
    marginLeft: 5,
  },
  industryCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  industryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#15352F',
  },
  industryAddress: {
    fontSize: 14,
    color: '#6c757d',
  },
  industryData: {
    marginTop: 10,
  },
  dataText: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center', // Alinhamento centralizado após a remoção da segunda opção
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#FFFFFF',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#15352F',
  },
});

export default DashboardScreen;
