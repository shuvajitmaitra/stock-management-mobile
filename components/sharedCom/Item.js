import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constant/Colors";
import { formatDate } from "@/utils/commonFunction";
import ImageView from "react-native-image-viewing";
import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";

const Item = ({ item, onDelete, onEdit, onUpdate, from = null }) => {
  const [images, setImages] = useState([]);

  return (
    <View style={styles.itemContainer}>
      {/* Left: Product Image */}
      <TouchableOpacity onPress={() => setImages([{ uri: item.image }])}>
        <Image
          source={item.image ? { uri: item.image } : require("@/assets/images/no_image.jpg")}
          style={styles.productImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Middle: Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.quantityText}>Qty: {item?.stockQuantity || 0}</Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.updateText}>{formatDate(item?.date)}</Text>
          <View style={styles.buttonsContainer}>
            {from && (
              <>
                <TouchableOpacity style={styles.actionButton} onPress={() => onUpdate && onUpdate(item)}>
                  <Feather name="edit" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => onEdit && onEdit(item)}>
                  <Foundation name="page-edit" size={20} color="#4ecdc4" />
                </TouchableOpacity>
              </>
            )}
            {
              <TouchableOpacity disabled={!from && !item.productId} style={styles.actionButton} onPress={() => onDelete && onDelete(item)}>
                <MaterialIcons name="delete" size={20} color={!from && !item.productId ? "#a0a0a0" : "#ff6b6b"} />
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>

      {/* Right: Action Buttons */}

      {/* Image viewer for full screen view */}
      <ImageView images={images} imageIndex={0} visible={images.length > 0} onRequestClose={() => setImages([])} />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginVertical: 6,
    paddingRight: 0,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginHorizontal: 10,
    // backgroundColor: "red",
  },
  itemName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  quantityText: {
    color: "#4ecdc4",
    fontSize: 14,
    marginBottom: 2,
  },
  updateText: {
    color: "#a0a0a0",
    fontSize: 12,
  },
  buttonsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  actionButton: {
    padding: 5,
  },
});

export default Item;
