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

// Sample data (you can fetch this from an API as needed)
const products = [
  {
    _id: "001",
    name: "Product 001",
    date: "2025-01-10T08:30:00.000Z",
    stockQuantity: 10,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-001.jpg",
  },
  {
    _id: "002",
    name: "Product 002",
    date: "2025-01-11T09:00:00.000Z",
    stockQuantity: 20,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-002.jpg",
  },
  {
    _id: "003",
    name: "Product 003",
    date: "2025-01-12T10:15:00.000Z",
    stockQuantity: 30,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-003.jpg",
  },
  // ... additional products up to 030
  {
    _id: "004",
    name: "Product 004",
    date: "2025-01-13T11:20:00.000Z",
    stockQuantity: 25,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-004.jpg",
  },
  {
    _id: "005",
    name: "Product 005",
    date: "2025-01-14T12:30:00.000Z",
    stockQuantity: 40,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-005.jpg",
  },
  {
    _id: "006",
    name: "Product 006",
    date: "2025-01-15T13:45:00.000Z",
    stockQuantity: 35,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-006.jpg",
  },
  {
    _id: "007",
    name: "Product 007",
    date: "2025-01-16T14:00:00.000Z",
    stockQuantity: 15,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-007.jpg",
  },
  {
    _id: "008",
    name: "Product 008",
    date: "2025-01-17T15:10:00.000Z",
    stockQuantity: 50,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-008.jpg",
  },
  {
    _id: "009",
    name: "Product 009",
    date: "2025-01-18T16:20:00.000Z",
    stockQuantity: 60,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-009.jpg",
  },
  {
    _id: "010",
    name: "Product 010",
    date: "2025-01-19T17:25:00.000Z",
    stockQuantity: 45,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-010.jpg",
  },
  {
    _id: "011",
    name: "Product 011",
    date: "2025-01-20T08:30:00.000Z",
    stockQuantity: 18,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-011.jpg",
  },
  {
    _id: "012",
    name: "Product 012",
    date: "2025-01-21T09:45:00.000Z",
    stockQuantity: 28,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-012.jpg",
  },
  {
    _id: "013",
    name: "Product 013",
    date: "2025-01-22T10:55:00.000Z",
    stockQuantity: 32,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-013.jpg",
  },
  {
    _id: "014",
    name: "Product 014",
    date: "2025-01-23T11:05:00.000Z",
    stockQuantity: 22,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-014.jpg",
  },
  {
    _id: "015",
    name: "Product 015",
    date: "2025-01-24T12:15:00.000Z",
    stockQuantity: 55,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-015.jpg",
  },
  {
    _id: "016",
    name: "Product 016",
    date: "2025-01-25T13:25:00.000Z",
    stockQuantity: 65,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-016.jpg",
  },
  {
    _id: "017",
    name: "Product 017",
    date: "2025-01-26T14:35:00.000Z",
    stockQuantity: 70,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-017.jpg",
  },
  {
    _id: "018",
    name: "Product 018",
    date: "2025-01-27T15:45:00.000Z",
    stockQuantity: 80,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-018.jpg",
  },
  {
    _id: "019",
    name: "Product 019",
    date: "2025-01-28T16:55:00.000Z",
    stockQuantity: 90,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-019.jpg",
  },
  {
    _id: "020",
    name: "Product 020",
    date: "2025-01-29T17:05:00.000Z",
    stockQuantity: 100,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-020.jpg",
  },
  {
    _id: "021",
    name: "Product 021",
    date: "2025-01-30T08:15:00.000Z",
    stockQuantity: 12,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-021.jpg",
  },
  {
    _id: "022",
    name: "Product 022",
    date: "2025-01-31T09:30:00.000Z",
    stockQuantity: 24,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-022.jpg",
  },
  {
    _id: "023",
    name: "Product 023",
    date: "2025-02-01T10:40:00.000Z",
    stockQuantity: 36,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-023.jpg",
  },
  {
    _id: "024",
    name: "Product 024",
    date: "2025-02-02T11:50:00.000Z",
    stockQuantity: 48,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-024.jpg",
  },
  {
    _id: "025",
    name: "Product 025",
    date: "2025-02-03T12:00:00.000Z",
    stockQuantity: 60,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-025.jpg",
  },
  {
    _id: "026",
    name: "Product 026",
    date: "2025-02-04T13:10:00.000Z",
    stockQuantity: 72,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-026.jpg",
  },
  {
    _id: "027",
    name: "Product 027",
    date: "2025-02-05T14:20:00.000Z",
    stockQuantity: 84,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-027.jpg",
  },
  {
    _id: "028",
    name: "Product 028",
    date: "2025-02-06T15:30:00.000Z",
    stockQuantity: 96,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-028.jpg",
  },
  {
    _id: "029",
    name: "Product 029",
    date: "2025-02-07T16:40:00.000Z",
    stockQuantity: 108,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-029.jpg",
  },
  {
    _id: "030",
    name: "Product 030",
    date: "2025-02-08T17:50:00.000Z",
    stockQuantity: 120,
    image: "https://res.cloudinary.com/demo/image/upload/v1610000000/product-030.jpg",
  },
];

const StockUpdateModal = ({ isVisible, onClose, onStockUpdate, singleProduct = null }) => {
  // Search & selection state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Transaction and quantity states
  const [transactionType, setTransactionType] = useState("Stock in");
  const [quantity, setQuantity] = useState(0);

  // Image Upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // Function that uploads an image to Cloudinary
  const uploadImageToCloudinary = async (uri, setUploading, setImageUrl) => {
    // Placeholder logic for uploading the image
    setUploading(true);
    try {
      // ... your upload logic here, e.g., using fetch or axios to send to Cloudinary API
      // For demo purposes, we'll just simulate an upload delay and set the URL.
      setTimeout(() => {
        setImageUrl(uri); // In real usage, this should be the URL returned by Cloudinary.
        setUploading(false);
      }, 1500);
    } catch (error) {
      Alert.alert("Upload Error", "Failed to upload image");
      setUploading(false);
    }
  };

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
      await uploadImageToCloudinary(result.assets[0].uri, setIsUploading, setUploadedImageUrl);
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
      await uploadImageToCloudinary(result.assets[0].uri, setIsUploading, setUploadedImageUrl);
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
