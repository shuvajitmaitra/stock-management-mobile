import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import ReactNativeModal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "@/utils/commonFunction";
import Divider from "../sharedCom/Divider";
import RequireIcon from "../../assets/icons/RequireIcon";
import { useStock } from "@/context/StockContext";
import { Colors } from "@/constant/Colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
const StockModal = ({ isVisible, onClose }) => {
  const { handleAddProduct, singleProduct, handleEditProduct, handleStockUpdate } = useStock();
  const [productName, setProductName] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [stockType, setStockType] = useState("in");
  const [quantity, setQuantity] = useState(10);
  useEffect(() => {
    if (singleProduct?.name || singleProduct?.image) {
      setProductName(singleProduct?.name);
      !singleProduct?.stockUpdate && setUploadedImageUrl(singleProduct?.image);
    }
  }, []);

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

  const handleSubmit = async () => {
    if (!productName.trim()) {
      Alert.alert("Validation Error", "Product name is required");
      return;
    }

    try {
      if (singleProduct?.stockUpdate) {
        console.log("singleProduct ", JSON.stringify(singleProduct, null, 2));
        await handleStockUpdate({
          name: productName,
          _id: singleProduct._id,
          stockQuantity: quantity,
          type: stockType,
          image: uploadedImageUrl,
        });
        setProductName("");
        setUploadedImageUrl(null);
        onClose();
      } else {
        await handleAddProduct({
          name: productName,
          image: uploadedImageUrl,
        });
        setProductName("");
        setUploadedImageUrl(null);
        onClose();
      }
    } catch (error) {
      console.log("error", JSON.stringify(error, null, 2));
      // Alert.alert("Error", "Could not add product. Please try again.");
    }
  };

  const handleEdit = async () => {
    if (!productName.trim()) {
      Alert.alert("Validation Error", "Product name is required");
      return;
    }

    try {
      await handleEditProduct({
        name: productName,
        image: uploadedImageUrl,
        _id: singleProduct?._id,
      });

      setProductName("");
      setUploadedImageUrl(null);
      onClose();
    } catch (error) {
      Alert.alert("Error", "Could not update product. Please try again.");
    }
  };

  return (
    <ReactNativeModal
      animationType="slide"
      avoidKeyboard
      transparent
      swipeDirection="down"
      onSwipeComplete={onClose}
      style={styles.modalStyle}
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropTransitionOutTiming={0}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            {singleProduct?._id ? (singleProduct?.stockUpdate ? "Update Stock" : "Update Your Product") : "Add Your Product"}
          </Text>
        </View>
        <Divider mb={0} />
        <Text style={styles.inputLabel}>
          Product Name <RequireIcon />
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter product name"
          placeholderTextColor="#555"
          value={productName}
          onChangeText={(text) => setProductName(text)}
          editable={!singleProduct?.stockUpdate}
          multiline
        />
        {singleProduct?.stockUpdate && (
          <>
            <Text style={styles.inputLabel}>Select type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={stockType}
                onValueChange={(itemValue) => setStockType(itemValue)}
                mode="dropdown"
              >
                <Picker.Item style={styles.pickerItem} label="Stock in" value="in" />
                <Picker.Item style={styles.pickerItem} label="Stock out" value="out" />
              </Picker>
            </View>
          </>
        )}
        {singleProduct?.stockUpdate && (
          <>
            <Text style={styles.inputLabel}>Product Quantity</Text>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Enter quantity..."
              keyboardType="numeric"
              placeholderTextColor={Colors.bodyText}
            />
          </>
        )}
        <Text style={styles.inputLabel}>Add Picture</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <EvilIcons name="camera" size={49} color={Colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={chooseFromGallery}>
            <Ionicons name="image-outline" size={35} color={Colors.secondary} />
          </TouchableOpacity>
        </View>
        {isUploading && <ActivityIndicator color="#FF6F61" size="large" />}

        {uploadedImageUrl && (
          <View style={styles.imagePreviewContainer}>
            <Text style={styles.uploadedText}>Product Image</Text>
            <Image source={{ uri: uploadedImageUrl }} style={styles.imagePreview} />
          </View>
        )}

        <TouchableOpacity
          disabled={isUploading}
          style={styles.submitButton}
          onPress={singleProduct && !singleProduct?.stockUpdate ? handleEdit : handleSubmit}
        >
          <Text style={styles.buttonText}>{singleProduct?._id ? "Update Product" : "Add Product"}</Text>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};

export default StockModal;

const styles = StyleSheet.create({
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
  modalStyle: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: Colors.header,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.heading,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: 15,
  },
  input: {
    width: "100%",
    minHeight: 45,
    borderColor: Colors.borderColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
  buttonContainer: {
    flexDirection: "row",

    gap: 10,
  },
  button: {
    borderRadius: 10,

    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.secondary,
    height: 50,
    width: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
  imagePreviewContainer: {
    marginTop: 10,
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
});
