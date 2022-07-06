import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import Typography from '../../components/Typography/Typography';
import {COLORS, SHADOW, SPACE} from '../../utils/theme';

const Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {params} = route;
  const [curs, setCurs] = useState(null);

  useEffect(() => {
    if (params.curs) {
      navigation.setOptions({
        headerTitle: params.curs.VchCode,
      });
      setCurs(params.curs);
    }
  }, [params]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {!!curs && (
          <View style={styles.cards}>
            <View style={styles.card}>
              <Typography sx={styles.label}>Code: </Typography>
              <Typography sx={styles.value}>{curs.VchCode}</Typography>
            </View>
            <View style={styles.card}>
              <Typography sx={styles.label}>Name: </Typography>
              <Typography sx={styles.value}>{curs.Vname}</Typography>
            </View>
            <View style={styles.card}>
              <Typography sx={styles.label}>Curs: </Typography>
              <Typography sx={styles.value}>{curs.Vcurs}</Typography>
            </View>
            <View style={styles.card}>
              <Typography sx={styles.label}>Vcode: </Typography>
              <Typography sx={styles.value}>{curs.Vcode}</Typography>
            </View>
            <View style={styles.card}>
              <Typography sx={styles.label}>Vnom: </Typography>
              <Typography sx={styles.value}>{curs.Vnom}</Typography>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  container: {
    flex: 1,
    padding: SPACE[3],
    backgroundColor: COLORS.secondary,
  },
  cards: {
    ...SHADOW.normal,
    padding: SPACE[3],
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  card: {
    flexDirection: 'row',
    marginBottom: SPACE[2],
  },
  label: {
    fontSize: 14,
    color: COLORS.primary,
  },
  value: {
    flexShrink: 1,
    fontSize: 14,
    color: COLORS.primaryExtraLight,
  },
});
