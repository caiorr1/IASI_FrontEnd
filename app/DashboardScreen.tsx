import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from './NavigationContext';

const DashboardScreen: React.FC = () => {
  const { navigateTo, authToken } = useNavigation();
  const [industries, setIndustries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch('http://localhost:3000/industrias', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setIndustries(data.industrias);
        } else {
          setError(data.error || 'Erro ao carregar indústrias');
        }
      } catch (error) {
        console.error('Erro ao carregar indústrias:', error);
        setError('Erro ao conectar ao servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, [authToken]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Ionicons name="arrow-back" size={24} color="#245F54" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Suas posses</Text>
        <TouchableOpacity style={styles.addIndustryButton} onPress={() => navigateTo('AddIndustry')}>
          <Ionicons name="add-circle-outline" size={20} color="#245F54" />
          <Text style={styles.addIndustryText}>Adicionar</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#245F54" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          industries.map((industry, index) => (
            <View key={index} style={styles.industryCard}>
              <Text style={styles.industryName}>{industry.nome}</Text>
              <Text style={styles.industryAddress}>{industry.endereco}</Text>
              <View style={styles.industryData}>
                <Text style={styles.dataText}>Eficiência Geral: {industry.eficiencia_geral}%</Text>
                <Text style={styles.dataText}>Redução de gastos: {industry.reducao_gastos}%</Text>
                <Text style={styles.dataText}>Redução da pegada de carbono: {industry.reducao_pegada_carbono}%</Text>
                <Text style={styles.dataText}>Uso de energia renovável: {industry.uso_energia_renovavel}%</Text>
              </View>
              {/* Botão de Editar passando a indústria específica */}
              <TouchableOpacity onPress={() => navigateTo('EditIndustry', { industry })}>
                <Ionicons name="create-outline" size={24} color="#245F54" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigateTo('Dashboard')} style={styles.footerButton}>
          <Ionicons name="home-outline" size={24} color="#245F54" />
          <Text style={styles.footerText}>Dashboard</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-around',
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
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default DashboardScreen;
