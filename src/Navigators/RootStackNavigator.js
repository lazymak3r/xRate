import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home/Home';
import Details from '../screens/Details/Details';
import Typography from '../components/Typography/Typography';
import {SPACE, COLORS, SHADOW} from '../utils/theme';

const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  const navigation = useNavigation();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="Details"
        component={Details}
        options={{
          headerTitle: '',
          headerStyle: {
            ...SHADOW.normal,
            backgroundColor: COLORS.white,
          },
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                hitSlop={{top: 5, right: 5, bottom: 5, left: 5}}>
                <Typography sx={styles.headerButton}>&#8592;</Typography>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;

const styles = StyleSheet.create({
  headerLeft: {
    paddingLeft: SPACE[3],
  },
  headerButton: {
    fontSize: 25,
    lineHeight: 25,
    color: COLORS.primaryExtraLight,
  },
});
