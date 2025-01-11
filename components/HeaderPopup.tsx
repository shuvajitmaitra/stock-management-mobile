import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Popover, { Rect } from "react-native-popover-view";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constant/Colors";
// Define the type for `position`
interface Position {
  x: number;
  y: number;
}

interface HeaderPopupProps {
  position?: Position | null; // Updated to match index.tsx type
  setPosition: (position: Position | null) => void; // Allow null in setPosition
}

const HeaderPopup: React.FC<HeaderPopupProps> = ({ position, setPosition }) => {
  console.log("pos", JSON.stringify(position, null, 2));
  // Updated type checking to handle the new position type

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
        <TouchableOpacity style={styles.stockButton}>
          <AntDesign name="plus" size={24} color="white" />
          <Text style={styles.text}>Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stockButton}>
          <Feather name="edit" size={24} color="white" />
          <Text style={styles.text}>Edit Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stockButton}>
          <Feather name="log-out" size={24} color={Colors.error} />
          <Text style={[styles.text, { color: Colors.error }]}>Sign Out</Text>
        </TouchableOpacity>
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
