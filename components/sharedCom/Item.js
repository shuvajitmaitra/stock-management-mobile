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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ConfirmationModal from "../Modal/ConfirmationModal";

const Item = ({ index, item, onDelete, onEdit, onUpdate, from = null, user }) => {
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.indexText}>{index + 1}</Text>
      {/* Left: Product Image */}
      <TouchableOpacity
        onPress={() => setImages([{ uri: item.image ? item.image : "https://pulsetechbd.com/uploads/sitesetting/pulse-(1).png" }])}
      >
        <Image
          source={{ uri: item.image ? item?.image : "https://pulsetechbd.com/uploads/sitesetting/pulse-(1).png" }}
          style={styles.productImage}
          resizeMode={item.image ? "cover" : "contain"}
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
          {from && (
            <View style={[styles.quantityContainer, { marginLeft: 20, gap: 0 }]}>
              <MaterialCommunityIcons name="currency-bdt" size={18} color="#fb8500" />
              <Text style={[styles.quantityText, { color: "#fb8500", marginTop: 2 }]}>
                {/* {(item?.price || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") || 0} */}

                {item?.price
                  ? Math.floor(item.price)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : "0"}
              </Text>
            </View>
          )}
          {item?.user?.fullName && (
            <View style={[styles.quantityContainer, !from && { marginLeft: 10 }]}>
              <Feather name="user" size={15} color="#a0a0a0" />
              <Text style={[styles.quantityText, { color: "#a0a0a0" }]}>{item?.user?.fullName || 0}</Text>
            </View>
          )}
        </View>
        <View style={[styles.bottomContainer, !from && user?.role !== "admin" && { marginTop: 5 }]}>
          <View style={styles.quantityContainer}>
            <FontAwesome6 name="clock" size={13} color="#a0a0a0" />
            <Text style={styles.updateText}>{formatDate(item?.date)}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            {from && (
              <>
                <TouchableOpacity
                  style={styles.actionButton}
                  onLongPress={() => user?.role === "admin" && onEdit && onEdit(item)}
                  onPress={() => onUpdate && onUpdate(item)}
                >
                  <Feather name="edit" size={20} color="#16C47F" />
                </TouchableOpacity>
                {/* {user?.role === "admin" && (
                  <TouchableOpacity style={styles.actionButton} onPress={() => onEdit && onEdit(item)}>
                    <Foundation name="page-edit" size={20} color="#4ecdc4" />
                  </TouchableOpacity>
                )} */}
              </>
            )}
            {user?.role === "admin" && (
              <TouchableOpacity disabled={!from && !item.productId} style={styles.actionButton} onPress={() => setModalVisible(true)}>
                <MaterialIcons name="delete" size={20} color={!from && !item.productId ? "#a0a0a0" : "#ff6b6b"} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {modalVisible && (
        <ConfirmationModal
          isVisible={modalVisible}
          tittle="Delete!"
          description="Are you sure you want to delete this product?"
          okPress={() => {
            // item.image && deleteCloudinaryImage(item.image);
            onDelete && onDelete(item);
            setModalVisible(false);
          }}
          cancelPress={() => setModalVisible(false)}
        />
      )}
      <ImageView images={images} imageIndex={0} visible={images.length > 0} onRequestClose={() => setImages([])} />
    </View>
  );
};

const styles = StyleSheet.create({
  indexText: {
    color: Colors.bodyText,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
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
    paddingLeft: 5,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: Colors.bodyText,
  },
  detailsContainer: {
    flex: 1,
    marginHorizontal: 10,
    // backgroundColor: "red",
  },
  itemName: {
    color: Colors.heading,
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
