import { FlatList, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constant/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Item from "@/components/sharedCom/Item";
import { useStock } from "@/context/StockContext";

const StockIn = () => {
  const { top } = useSafeAreaInsets();
  const { stockIn, handleDeleteHistory, user } = useStock();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter stockIn based on search query
  const filteredStockIn = stockIn.filter((item) => item.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Text style={styles.headingText}>Stock In</Text>
      <Text style={styles.subHeadingText}>Monitor Every Restock, Effortlessly.</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search stock in items..."
        placeholderTextColor={Colors.white}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredStockIn}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => <Item index={index} user={user} item={item} onDelete={handleDeleteHistory} />}
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
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.header,
  },
  searchInput: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: Colors.white,
  },
});
