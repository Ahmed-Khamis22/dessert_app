import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../authContext';
import Header from '../Header';
import * as Font from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      GreatVibes: require('../assets/fonts/GreatVibes-Regular.ttf'),
      MerriweatherSans: require('../assets/fonts/MerriweatherSans-LightItalic.ttf'),
      PlayfairDisplay: require('../assets/fonts/FontsFree-Net-PlayfairDisplay-Black.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <Stack screenOptions={{
        headerShown: false, // ← ده يخفي الهيدر الأبيض فعلاً
      }}
    >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="singleProduct" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
