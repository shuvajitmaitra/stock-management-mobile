import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constant/Colors";
import { formatDate } from "@/utils/commonFunction";
import ImageView from "react-native-image-viewing";
import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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
        <View style={styles.quantityContainer}>
          <View style={styles.quantityContainer}>
            <SimpleLineIcons name="handbag" size={13} color="#4ecdc4" />
            <Text style={styles.quantityText}>{item?.stockQuantity || 0}</Text>
          </View>
          {item?.user?.fullName && (
            <View style={styles.quantityContainer}>
              <Feather name="user" size={15} color="#a0a0a0" />
              <Text style={[styles.quantityText, { color: "#a0a0a0" }]}>{item?.user?.fullName || 0}</Text>
            </View>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.quantityContainer}>
            <FontAwesome6 name="clock" size={13} color="#a0a0a0" />
            <Text style={styles.updateText}>{formatDate(item?.date)}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            {from && (
              <>
                <TouchableOpacity style={styles.actionButton} onPress={() => onUpdate && onUpdate(item)}>
                  <Feather name="edit" size={20} color="#16C47F" />
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
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
