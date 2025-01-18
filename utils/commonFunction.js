import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

export function formatDate(dateStr) {
  if (!dateStr) return dateStr;
  const date = new Date(dateStr);

  // Day with leading zero
  const day = String(date.getDate()).padStart(2, "0");

  // Short month name
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];

  // Full year
  const year = date.getFullYear();

  // Hours and minutes
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const hourStr = String(hours).padStart(2, "0");

  return `${hourStr}:${minutes} ${ampm} ${day} ${month}, ${year}`;
}

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

export const saveObject = async (key, obj) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
    console.log("Object saved successfully!");
  } catch (error) {
    console.error("Error saving object", error);
  }
};

export const removeFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from storage:", error);
  }
};

export const signOut = async () => {
  try {
    await AsyncStorage.clear();
    router.dismissAll();
    router.replace("/signin");
  } catch (error) {
    console.error("Error clearing storage:", error);
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

// utils/commonFunctions.js

export const uploadImageToCloudinary = async (uri, setIsUploading, setUploadedImageUrl) => {
  if (!uri) {
    alert("Please select or capture an image first!");
    return null;
  }

  try {
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      type: "image/jpeg", // or "image/png"
      name: "upload.jpg",
    });
    formData.append("upload_preset", `${process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`);

    const response = await axios.post(`${process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_URL}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setUploadedImageUrl(response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Image upload failed. Please try again.");
    return null;
  } finally {
    setIsUploading(false);
  }
};
