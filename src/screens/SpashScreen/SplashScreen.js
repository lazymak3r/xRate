import React, {useRef, useEffect, useCallback} from 'react';
import {
  View,
  Easing,
  Animated,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Typography from '../../components/Typography/Typography';
import {COLORS} from '../../utils/theme';

const SplashScreen = ({onLoadEnd}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      zoomAnimation(1, 300).start(() => {
        onLoadEnd();
      });
    }, 2500);
  }, []);

  const zoomAnimation = useCallback((toValue, duration) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.elastic(0)),
    });
  }, []);

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 10],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const opacity2 = animatedValue.interpolate({
    inputRange: [0, 0.2],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{opacity, transform: [{scale}]}}>
        <Typography sx={styles.name}>xRate</Typography>
      </Animated.View>
      <Animated.View style={[styles.loader, {opacity: opacity2}]}>
        <ActivityIndicator color={'#ffffff'} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black,
  },
  name: {
    fontSize: 50,
    color: COLORS.primaryExtraLight,
  },
  loader: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default SplashScreen;
