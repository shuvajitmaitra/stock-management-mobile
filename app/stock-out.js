import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constant/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Item from "@/components/sharedCom/Item";
import { useStock } from "@/context/StockContext";

const StockOut = () => {
  const { top } = useSafeAreaInsets();
  const { stockOut } = useStock();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Text style={styles.headingText}>Stock Out</Text>
      <Text style={styles.subHeadingText}>Your Stock Out History, All in One Place.</Text>
      <FlatList
        data={stockOut}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Item item={item} />}
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
    marginBottom: 13,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.header,
  },
});
