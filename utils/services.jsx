import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error storing data for key "${key}":`, error);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value; // Return the value if it exists
    } else {
      return null; // Explicitly return null if the key does not exist
    }
  } catch (error) {
    console.error(`Error retrieving data for key "${key}":`, error);
    return null; // Return null in case of error
  }
};

const deleteData = async (key) =>{
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error deleting data for key "${key}":`, error);
  }
}

export default {
  storeData,
  getData,
  deleteData
};
