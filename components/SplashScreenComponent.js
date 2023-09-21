import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as SplashScreen from 'expo-splash-screen';

const SplashScreenComponent = ({ onFinish }) => {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    // Simulate some loading time (you can replace this with your actual loading logic)
    setTimeout(() => {
      SplashScreen.hideAsync();
      onFinish(); // Notify that the splash screen has finished
    }, 1000); // Adjust the duration as needed
  }, []);

  return (
    <View>
      <Image
        source={require('../assets/splash.png')}
      />
    </View>
  );
};


export default SplashScreenComponent;
