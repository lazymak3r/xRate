import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    console.log(err);
  }
};

export const storeData = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};
