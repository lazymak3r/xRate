import React, {useCallback, useContext} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Typography from '../Typography/Typography';
import CustomTouch from '../CustomTouch/CustomTouch';
import {RootContext} from '../../Contexts/RootContext';
import {COLORS, SHADOW, SPACE} from '../../utils/theme';

const CursList = ({sx}) => {
  const navigation = useNavigation();

  const {curs, loading} = useContext(RootContext);

  const navigateToDetails = useCallback(item => {
    navigation.navigate('Details', {curs: item});
  }, []);

  const renderItem = useCallback(({item, index}) => {
    return (
      <CustomTouch
        onPress={() => navigateToDetails(item)}
        sx={styles.listItemWrapper}>
        <View style={styles.listItem}>
          <Typography sx={styles.listItemLabel}>{item.Vname}</Typography>
          <Typography sx={styles.listItemValue}>
            <Typography sx={styles.abbr}>{item.VchCode} </Typography>
            {item.Vcurs}
          </Typography>
        </View>
      </CustomTouch>
    );
  }, []);

  return (
    <View style={[styles.container, sx]}>
      {!curs && !!loading && <ActivityIndicator color={COLORS.primary} />}
      <FlatList
        data={curs}
        renderItem={renderItem}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.VchCode}
      />
    </View>
  );
};

export default CursList;

const styles = StyleSheet.create({
  container: {
    ...SHADOW.normal,
    borderRadius: 8,
    padding: SPACE[3],
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  listContainer: {
    flexGrow: 1,
  },
  listItemWrapper: {
    marginBottom: SPACE[2],
  },
  listItem: {
    padding: SPACE[2],
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.primaryExtraLight,
  },
  listItemLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.black,
    marginRight: SPACE[3],
    marginBottom: SPACE[1],
  },
  abbr: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  listItemValue: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
  },
});
