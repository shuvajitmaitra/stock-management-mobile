import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constant/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Item from "@/components/sharedCom/Item";
import { useStock } from "@/context/StockContext";

const StockIn = () => {
  const { top } = useSafeAreaInsets();
  const { stockIn, handleDeleteHistory, user } = useStock();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Text style={styles.headingText}>Stock In</Text>
      <Text style={styles.subHeadingText}>Monitor Every Restock, Effortlessly.</Text>
      <FlatList
        data={stockIn}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Item user={user} item={item} onDelete={handleDeleteHistory} />}
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
