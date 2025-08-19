import { FlatList, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constant/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Item from "@/components/sharedCom/Item";
import { useStock } from "@/context/StockContext";

const StockOut = () => {
  const { top } = useSafeAreaInsets();
  const { stockOut, handleDeleteHistory, user } = useStock();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter stockOut based on search query
  const filteredStockOut = stockOut.filter((item) => item.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Text style={styles.headingText}>Stock Out</Text>
      <Text style={styles.subHeadingText}>Your Stock Out History, All in One Place.</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search stock out items..."
        placeholderTextColor={Colors.white}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredStockOut}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => <Item index={index} user={user} item={item} onDelete={handleDeleteHistory} />}
      />
    </View>
  );
};

export default StockOut;

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
