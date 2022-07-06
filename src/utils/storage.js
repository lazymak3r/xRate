import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    alert(err);
  }
};

export const storeData = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (err) {
    alert(err);
  }
};
