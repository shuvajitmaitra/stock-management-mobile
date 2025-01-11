import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constant/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Item from "@/components/sharedCom/Item";

const StockIn: React.FC = () => {
  const { top } = useSafeAreaInsets();
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

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Text style={styles.headingText}>Stock In</Text>
      <Text style={styles.subHeadingText}>Monitor Every Restock, Effortlessly.</Text>
      <FlatList
        data={products}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
};

export default StockIn;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
  },
  subHeadingText: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 13,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.header,
  },
});
