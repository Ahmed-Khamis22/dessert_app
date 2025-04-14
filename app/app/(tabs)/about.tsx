// Enhanced About.tsx with improved typography, fonts, layout spacing, and overall polish
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Link } from 'expo-router';

const teamImage = require('../../assets/images/teamImage2.jpg');
const logo = 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png';

export default function AboutScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=80' }}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Image source={{ uri: logo }} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>About Our Project</Text>
          <Text style={styles.quote}>
            “Bringing sweetness to your fingertips 🍬”
          </Text>

          <Text style={styles.description}>
            Welcome to our sweet treats store! This project is a mobile application crafted for dessert lovers.
            It allows users to browse, explore, and order delicious desserts. Designed with care using modern technologies,
            our app delivers a seamless and joyful user experience.
          </Text>

          <View style={styles.divider} />

          <View style={styles.stackCard}>
            <Text style={styles.stackTitle}>Built with:</Text>
            <Text style={styles.stackItem}>React Native</Text>
            <Text style={styles.stackItem}>Expo Router</Text>
            <Text style={styles.stackItem}>TypeScript</Text>
          </View>

          <View style={styles.divider} />

          <Image source={teamImage} style={styles.image} resizeMode="cover" />

          <Text style={styles.teamTitle}> Our Team</Text>

          <View style={styles.namesList}>
            <Text style={styles.memberName}> Ahmed Khamis</Text>
            <Text style={styles.memberName}> Magdy Abd_ElFadeel</Text>
            <Text style={styles.memberName}> Shahd Hesham</Text>
            <Text style={styles.memberName}> Wageeh Gad</Text>
            <Text style={styles.memberName}> Abd_Elrahman Mansy</Text>
            <Text style={styles.memberName}> Youssef Mohamed</Text>
          </View>

          <Link href="/(tabs)" asChild>
            <TouchableOpacity style={styles.backLink}>
              <Text style={styles.backText}>Back to Home</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderRadius: 24,
    padding: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 44,
    fontFamily: 'GreatVibes',
    color: '#6d4c41',
    marginBottom: 4,
    textAlign: 'center',
  },
  quote: {
    fontSize: 15,
    color: '#7e7e7e',
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily:'MerriweatherSans',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  stackCard: {
    width: '100%',
    backgroundColor: '#fce4ec',
    padding: 16,
    borderRadius: 14,
  },
  stackTitle: {
    fontSize: 30,
    color: '#c2185b',
    marginBottom: 8,
    fontFamily: 'GreatVibes',
    textAlign:'center',
  },
  stackItem: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
    fontFamily:'PlayfairDisplay',
    textAlign:'center',

  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 18,
    marginTop: 24,
    marginBottom: 20,
  },
  teamTitle: {
    fontSize: 40,
    color: '#d81b60',
    marginBottom: 12,
    fontFamily: 'GreatVibes',
  },
  namesList: {
    width: '100%',
    paddingLeft: 10,
    textAlign:'center',

  },
  memberName: {
    fontSize: 16,
    color: '#4e342e',
    marginBottom: 10,
    fontFamily:'PlayfairDisplay',
    textAlign:'center',

  },
  backLink: {
    marginTop: 30,
    backgroundColor: '#6d4c41',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});