import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = ({setIsLoading}) => {

  return (
    <View style={styles.splash}>
      <LottieView
        source={require('../assets/json/splashAnim.json')}
        autoPlay
        loop={false}
        resizeMode="cover"
        onAnimationFinish={() => {
          console.log('animation finished');
          setIsLoading(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    margin: 0,
  },
});

export default Splash;