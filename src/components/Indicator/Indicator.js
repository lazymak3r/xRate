import React, {useRef, useMemo, useEffect, useCallback} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

import {COLORS} from '../../utils/theme';

const Indicator = ({active, sx}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const indicatorStyles = useMemo(() => {
    const stylesArr = [styles.container];
    stylesArr.push(active ? styles.active : styles.inactive);
    !!sx && stylesArr.push(sx);

    return stylesArr;
  }, [active, sx]);

  const startAnimation = useCallback(() => {
    return Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    );
  }, []);

  useEffect(() => {
    const animation = startAnimation();
    animation.start();

    return () => {
      animation.reset();
    };
  }, []);

  const scaleInterpolated = animatedValue.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 2],
  });

  const opacityInterpolated = animatedValue.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
  });

  const scaleInterpolated2 = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const opacityInterpolated2 = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={indicatorStyles}>
      <Animated.View
        style={[
          indicatorStyles,
          styles.cycle,
          {
            opacity: opacityInterpolated,
            transform: [{scale: scaleInterpolated}],
          },
        ]}
      />

      <Animated.View
        style={[
          indicatorStyles,
          styles.cycle,
          {
            opacity: opacityInterpolated2,
            transform: [{scale: scaleInterpolated2}],
          },
        ]}
      />
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  container: {
    width: 14,
    height: 14,
    borderRadius: 12,
  },
  active: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
  },
  inactive: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  cycle: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
});
