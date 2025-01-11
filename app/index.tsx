import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Item from "@/components/sharedCom/Item";
import { Colors } from "@/constant/Colors";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([
    { id: "1", name: "ECG 12 Channel EDAN (SE 1200 EXPRESS)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "2", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "3", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "4", name: "Defib (DS 2)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "5", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "6", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "1", name: "ECG 12 Channel EDAN (SE 1200 EXPRESS)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "2", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "3", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "4", name: "Defib (DS 2)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "5", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "6", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "1", name: "ECG 12 Channel EDAN (SE 1200 EXPRESS)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "2", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "3", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "4", name: "Defib (DS 2)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "5", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "6", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "1", name: "ECG 12 Channel EDAN (SE 1200 EXPRESS)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "2", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "3", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "4", name: "Defib (DS 2)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "5", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "6", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "1", name: "ECG 12 Channel EDAN (SE 1200 EXPRESS)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "2", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "3", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    { id: "4", name: "Defib (DS 2)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "5", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "6", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
  ]);

  const handleDelete = (id: string) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.stockButton}>
          <Feather name="edit" size={24} color="white" />
        </TouchableOpacity>
        <TextInput style={styles.searchBar} placeholder="Search product" value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      <FlatList
        data={filteredProducts}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => Math.random().toString()}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    height: 45,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
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
