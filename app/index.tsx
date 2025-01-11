import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([
    { id: "1", name: "ECG 12 Channel EDAN (SE 1200 EXPRESS)", quantity: 0, lastUpdate: "01:36 PM 05 Jan, 2025", image: "image-url-1" },
    { id: "2", name: "ECG 6 Channel ECARE (ECG-606A)", quantity: 0, lastUpdate: "01:29 PM 05 Jan, 2025", image: "image-url-2" },
    { id: "3", name: "CPAP Machine (G3 A20)", quantity: 0, lastUpdate: "12:45 PM 05 Jan, 2025", image: "image-url-3" },
    // Add more items as per your data
  ]);

  const handleDelete = (id: string) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Dashboard</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stockButton}>
          <Text style={styles.buttonText}>Stock Update</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput style={styles.searchBar} placeholder="Search product" value={searchQuery} onChangeText={setSearchQuery} />

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Serial</Text>
        <Text style={styles.tableHeaderCell}>Product Name</Text>
        <Text style={styles.tableHeaderCell}>Image</Text>
        <Text style={styles.tableHeaderCell}>Quantity</Text>
        <Text style={styles.tableHeaderCell}>Last Update</Text>
        <Text style={styles.tableHeaderCell}>Action</Text>
      </View>

      {/* Product Table */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.id}</Text>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>{item.lastUpdate}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1c1e24",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
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
    backgroundColor: "#dc3545",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
