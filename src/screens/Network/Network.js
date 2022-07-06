import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import {COLORS} from '../../utils/theme';

const Network = () => {
  const [connectedToNetwork, setConnectedToNetwork] = useState(true);

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setConnectedToNetwork(state.isConnected);
    });

    return () => {
      unsubscribeNetInfo();
    };
  }, []);

  const indicatorStyles = useMemo(() => {
    const stylesArr = [styles.indicator];
    stylesArr.push(connectedToNetwork ? styles.connected : styles.disconnected);

    return stylesArr;
  }, [connectedToNetwork]);

  return (
    <View style={styles.indicatorContainer}>
      <View style={[indicatorStyles, {height: 5}]} />
      <View style={[indicatorStyles, {height: 10}]} />
      <View style={[indicatorStyles, {height: 15}]} />
    </View>
  );
};

export default Network;

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  indicator: {
    width: 5,
    marginRight: 1,
    borderRadius: 8,
  },
  connected: {
    backgroundColor: COLORS.green,
  },
  disconnected: {
    backgroundColor: COLORS.red,
  },
});
