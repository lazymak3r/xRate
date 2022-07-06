import React, {useRef} from 'react';
import {Pressable, Animated} from 'react-native';

const CustomTouch = ({
  children,
  minScale = 1,
  maxScale = 0.98,
  sx = {},
  ...props
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  const pressInAnimation = () => {
    return Animated.timing(animation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const pressOutAnimation = () => {
    return Animated.timing(animation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [minScale, maxScale],
  });

  return (
    <Pressable
      {...props}
      onPressIn={pressInAnimation}
      onPressOut={pressOutAnimation}>
      <Animated.View style={[{transform: [{scale}]}, sx]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default CustomTouch;
