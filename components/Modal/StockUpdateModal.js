import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
  ActivityIndicator,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ReactNativeModal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constant/Colors";
import { uploadImageInDigitalOcean } from "@/utils/commonFunction";

const StockUpdateModal = ({ isVisible, onClose, onStockUpdate, singleProduct = null }) => {
  // Search & selection state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Transaction and quantity states
  const [transactionType, setTransactionType] = useState("Stock in");
  const [quantity, setQuantity] = useState(0);

  // Image Upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Camera access is required to take photos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      await uploadImageInDigitalOcean(result.assets[0], setIsUploading, setUploadedImageUrl);
    }
  };

  const chooseFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Gallery access is required to choose photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      await uploadImageInDigitalOcean(result.assets[0], setIsUploading, setUploadedImageUrl);
    }
  };

  // Handle submission logic
  const handleSubmit = () => {
    if (!selectedProduct && !searchQuery) {
      Alert.alert("Error", "Please select a product.");
      return;
    }
    if (!quantity || isNaN(quantity)) {
      Alert.alert("Error", "Please enter a valid quantity.");
      return;
    }
    // Prepare payload. You might want to merge the state as needed.
    const payload = {
      productId: selectedProduct?._id,
      transactionType,
      quantity: parseInt(quantity, 10),
      image: uploadedImageUrl, // optional image URL
    };

    // Pass the payload to the parent component or API call
    onStockUpdate(payload);
    // Optionally reset state
    setSearchQuery("");
    setSelectedProduct(null);
    setQuantity("");
    setUploadedImageUrl("");
    onClose();
  };

  return (
    <ReactNativeModal
      avoidKeyboard={true}
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Product Name</Text>
        <View style={styles.input}>
          <Text style={{ color: Colors.bodyText }}>{singleProduct.name}</Text>
        </View>

        <Text style={styles.label}>Select type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={transactionType}
            onValueChange={(itemValue) => setTransactionType(itemValue)}
            mode="dropdown"
          >
            <Picker.Item style={styles.pickerItem} label="Stock in" value="in" />
            <Picker.Item style={styles.pickerItem} label="Stock out" value="out" />
          </Picker>
        </View>

        <Text style={styles.label}>Product Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Enter quantity..."
          keyboardType="numeric"
          placeholderTextColor={Colors.bodyText}
        />

        <Text style={styles.label}>Add Picture</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <EvilIcons name="camera" size={49} color={Colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={chooseFromGallery}>
            <Ionicons name="image-outline" size={35} color={Colors.secondary} />
          </TouchableOpacity>
        </View>
        {isUploading && <ActivityIndicator color="#FF6F61" size="large" />}

        {(Boolean(singleProduct?.image) || uploadedImageUrl) && (
          <View style={styles.imagePreviewContainer}>
            <Text style={styles.uploadedText}>Product Image</Text>
            <Image source={{ uri: uploadedImageUrl || singleProduct.image }} style={styles.imagePreview} />
          </View>
        )}

        <TouchableOpacity disabled={isUploading} style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 40 : 10,
    borderRadius: 7,
    backgroundColor: Colors.header,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
    marginTop: 12,
    color: Colors.heading,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 10,
    borderRadius: 5,
    color: Colors.bodyText,
    backgroundColor: Colors.primary,
  },
  suggestionsContainer: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: Colors.secondary,
    marginTop: 4,
    borderRadius: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  suggestionText: {
    color: Colors.bodyText,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    // Add any custom styles if needed
  },
  pickerItem: {
    flex: 1,
    color: Colors.bodyText,
    backgroundColor: Colors.primary,
    padding: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  imagePreviewContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  uploadedText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  submitButton: {
    marginTop: 15,
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  selectedProductContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 5,
  },
});

export default StockUpdateModal;
