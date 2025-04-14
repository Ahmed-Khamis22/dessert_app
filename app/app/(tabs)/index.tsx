// Redesigned Home Screen with icon-based navigation
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import { useAuth } from '../../authContext';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const backgroundImg = {
  uri: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=80'
};

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
      Alert.alert('Success', 'Logged out successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to DessertDelights 🍰</Text>
        <Text style={styles.subtitle}>Your sweet cravings, our sweet mission!</Text>

        <View style={styles.iconGrid}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/products')}>
            <MaterialCommunityIcons name="cupcake" size={42} color="#d81b60" />
            <Text style={styles.iconLabel}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/about')}>
            <FontAwesome5 name="info-circle" size={42} color="#d81b60" />
            <Text style={styles.iconLabel}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={42} color="#6d4c41" />
            <Text style={styles.iconLabel}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 31,
    color: '#fff',
    fontFamily: 'GreatVibes',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 400,
  },
  iconButton: {
    alignItems: 'center',
    margin: 20,
  },
  iconLabel: {
    marginTop: 8,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});