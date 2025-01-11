import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Item from "@/components/sharedCom/Item";
import { Colors } from "@/constant/Colors";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderPopup from "@/components/HeaderPopup";
interface Position {
  x: number;
  y: number;
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [position, setPosition] = useState<Position | null>(null);

  const [products, setProducts] = useState([
    {
      id: "product1",
      name: "ECG 12 Channel EDAN (SE 1200 EXPRESS)",
      quantity: 0,
      lastUpdate: "01:36 PM 05 Jan, 2025",
      image: "image-url-1",
    },
    { id: "product2", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "product3", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "product4", name: "Defib (DS 2)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "product5", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "product6", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    {
      id: "product7",
      name: "ECG 12 Channel EDAN (SE 1200 EXPRESS)",
      quantity: 0,
      lastUpdate: "01:36 PM 05 Jan, 2025",
      image: "image-url-1",
    },
    { id: "product8", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "product9", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "product10", name: "Defib (DS 2)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "product11", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "product12", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    {
      id: "product13",
      name: "ECG 12 Channel EDAN (SE 1200 EXPRESS)",
      quantity: 0,
      lastUpdate: "01:36 PM 05 Jan, 2025",
      image: "image-url-1",
    },
    { id: "product14", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "product15", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "product16", name: "Defib (DS 2)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "product17", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "product18", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    {
      id: "product19",
      name: "ECG 12 Channel EDAN (SE 1200 EXPRESS)",
      quantity: 0,
      lastUpdate: "01:36 PM 05 Jan, 2025",
      image: "image-url-1",
    },
    { id: "product20", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "product21", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "product22", name: "Defib (DS 2)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "product23", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "product24", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
  ]);

  const handleDelete = (id: string) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.stockButton}>
          <Feather name="edit" size={24} color="white" />
        </TouchableOpacity> */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search product"
          placeholderTextColor={Colors.white}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={(event) => setPosition({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY })}
          style={styles.settingsButtonContainer}
        >
          <SettingsIcon size={30} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item item={item} />}
      />
      {<HeaderPopup position={position} setPosition={setPosition} />}
    </View>
  );
}

const styles = StyleSheet.create({
  settingsButtonContainer: {
    padding: 8,
    borderRadius: 7,
    backgroundColor: Colors.secondary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.header,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
    // backgroundColor: "red",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  stockButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
  },
  searchBar: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    padding: 10,
    height: 45,
    color: Colors.white,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
  },
  tableHeaderCell: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 5,
  },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  deleteButton: {
    padding: 5,
  },
});
