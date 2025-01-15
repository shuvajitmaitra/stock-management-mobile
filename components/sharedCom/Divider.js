import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constant/Colors";

const Divider = ({ mt = 10, mb = 10 }) => {
  return <View style={{ marginTop: mt, marginBottom: mb, borderBottomWidth: 1, borderBottomColor: Colors.secondary, width: "100%" }} />;
};

export default Divider;

const styles = StyleSheet.create({});
