import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import moment from 'moment';

import Network from '../../screens/Network/Network';
import Indicator from '../Indicator/Indicator';
import Typography from '../Typography/Typography';
import {RootContext} from '../../Contexts/RootContext';
import {COLORS, SHADOW, SPACE} from '../../utils/theme';

const TopPanel = ({sx}) => {
  const {loading, lastUpdate} = useContext(RootContext);

  return (
    <View style={[styles.container, sx]}>
      <View style={styles.wrapper}>
        <Indicator active={loading} sx={styles.indicator} />
        <View style={styles.date}>
          <Typography sx={styles.label}>Обновлено: </Typography>
          {!!lastUpdate && (
            <View style={styles.value}>
              <Typography sx={styles.valueTime}>
                {moment(lastUpdate).format('HH:mm:ss')}
              </Typography>
              <Typography sx={styles.valueDate}>
                {moment(lastUpdate).format('MM.DD.YYYY')}
              </Typography>
            </View>
          )}
        </View>
      </View>
      <Network />
    </View>
  );
};

export default TopPanel;

const styles = StyleSheet.create({
  container: {
    ...SHADOW.normal,
    borderRadius: 8,
    padding: SPACE[3],
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  indicator: {
    marginRight: SPACE[3],
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  value: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueTime: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
  },
  valueDate: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: SPACE[1],
    color: COLORS.primaryLight,
  },
});
