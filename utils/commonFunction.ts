import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error("Error storing data:", e);
    return false;
  }
};
