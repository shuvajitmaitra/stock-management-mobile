import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Popover, { Rect } from "react-native-popover-view";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constant/Colors";
import { router } from "expo-router";
const HeaderPopup = ({ position, setPosition, addProduct, user, products }) => {
  return (
    <Popover
      popoverStyle={{
        backgroundColor: Colors.secondary,
      }}
      from={new Rect(position?.x ?? 0, position?.y ?? 0, 0, 0)}
      isVisible={Boolean(position)}
      onRequestClose={() => {
        setPosition(null);
      }}
    >
      <View style={styles.popoverStyle}>
        {user?.role === "admin" && (
          <TouchableOpacity
            onPress={() => {
              setPosition(null);
              addProduct();
            }}
            style={styles.stockButton}
          >
            <AntDesign name="plus" size={24} color="white" />
            <Text style={styles.text}>Add Product</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            router.dismissAll();
            router.push("/signin");
          }}
          style={styles.stockButton}
        >
          <Feather name="log-out" size={24} color={Colors.error} />
          <Text style={[styles.text, { color: Colors.error }]}>Sign Out</Text>
        </TouchableOpacity>
        <View style={styles.stockButton}>
          <Text style={styles.text}>Total Products: {products}</Text>
        </View>
      </View>
    </Popover>
  );
};

export default HeaderPopup;

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
  },
  stockButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  popoverStyle: {
    backgroundColor: Colors.secondary,
    width: 200,
    padding: 10,
    gap: 10,
  },
});
