import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constant/Colors";
import { formatDate } from "@/utils/commonFunction";
import ImageView from "react-native-image-viewing";

const Item = ({ item, onDelete, onEdit }) => {
  const [images, setImages] = useState([]);
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => setImages([{ uri: item.image }])}>
        <Image
          source={item.image ? { uri: item.image } : require("@/assets/images/no_image.jpg")}
          style={styles.productImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.itemMetadata}>
          <Text style={styles.quantityText}>Qty: {item?.stockQuantity || 0}</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.updateText}>{formatDate(item?.date)}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => onEdit && onEdit(item._id)}>
              <MaterialIcons name="edit" size={24} color="#4ecdc4" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete && onDelete(item._id)}>
              <MaterialIcons name="delete" size={24} color="#ff6b6b" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ImageView images={images} imageIndex={0} visible={images.length > 0} onRequestClose={() => setImages([])} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 15,
  },
  productImage: {
    width: 70,
    height: 70,
    marginRight: 15,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemMetadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
    gap: 10,
  },
  quantityText: {
    color: "#4ecdc4",
    fontSize: 14,
  },
  updateText: {
    color: "#a0a0a0",
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  editButton: {
    padding: 5,
  },
  deleteButton: {
    padding: 5,
  },
});

export default Item;
