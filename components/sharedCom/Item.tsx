import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constant/Colors";

interface Product {
  id: string;
  name: string;
  quantity: number;
  lastUpdate: string;
  image: string;
}

interface ItemProps {
  item: Product;
  onDelete?: (id: string) => void;
}

const Item: React.FC<ItemProps> = ({ item, onDelete }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={require("@/assets/images/no_image.jpg")} style={styles.productImage} resizeMode="contain" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.itemMetadata}>
          <Text style={styles.quantityText}>Qty: {item.quantity}</Text>
          <Text style={styles.updateText}>{item.lastUpdate}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete && onDelete(item.id)}>
        <MaterialIcons name="delete" size={24} color="#ff6b6b" />
      </TouchableOpacity>
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
  },
  quantityText: {
    color: "#4ecdc4",
    fontSize: 14,
  },
  updateText: {
    color: "#a0a0a0",
    fontSize: 12,
  },
  deleteButton: {
    padding: 10,
  },
});

export default Item;
