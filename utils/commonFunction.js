import AsyncStorage from "@react-native-async-storage/async-storage";

export const formatDate = (date = new Date()) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const saveToStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error("Error saving to storage:", error);
  }
};

export const getFromStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error getting from storage:", error);
    return null;
  }
};

export const calculateTotalStockValue = (items) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

export const validateInput = (data, requiredFields) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!data[field] || data[field].trim() === "") {
      errors[field] = `${field} is required`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
