import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ReactNativeModal from "react-native-modal";
import BinIcon from "../../assets/icons/BinIcon";
import { Colors } from "@/constant/Colors";

const ConfirmationModal = ({ isVisible, tittle = "", description = "", okPress = () => {}, cancelPress = () => {} }) => {
  return (
    <ReactNativeModal onBackdropPress={cancelPress} isVisible={isVisible}>
      <View style={styles.container}>
        <View
          style={{
            height: 100,
            width: 100,
            backgroundColor: Colors.header,
            borderRadius: 100,
            // marginBottom: "-50%",
            justifyContent: "center",
            alignItems: "center",
            // marginTop: -70,
            shadowColor: Colors.white,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 3,
          }}
        >
          <BinIcon color={Colors.Red} size={50} />
        </View>
        <Text style={styles.Heading}>{tittle || ""}</Text>
        <Text style={styles.description}>{description || ""}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              cancelPress();
            }}
            style={styles.button}
          >
            <Text style={{ color: Colors.white, fontWeight: "500", fontSize: 18 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              okPress();
            }}
            style={[styles.button, { backgroundColor: Colors.error }]}
          >
            <Text style={{ color: Colors.white, fontWeight: "500", fontSize: 18 }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
  description: {
    color: Colors.bodyText,
    // backgroundColor: "red",
  },
  Heading: {
    fontSize: 24,
    color: Colors.heading,
    fontWeight: "bold",
    marginTop: 10,
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.header,
    borderRadius: 10,
    padding: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
});
