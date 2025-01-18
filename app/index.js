import React from "react";
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { Link, Stack } from "expo-router";

const { height } = Dimensions.get("window");

const WelcomeScreen = () => {
  return (
    <>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.container}>
        <ImageBackground
          source={{ uri: "https://pulsetechbd.com/uploads/sitesetting/pulse.png" }}
          style={styles.topHalf}
          resizeMode="contain"
        >
          <View style={styles.imageOverlay} />
        </ImageBackground>

        {/* Curved bottom container for content */}
        <View style={styles.bottomHalf}>
          <Text style={styles.title}>Welcome to Pulse Technologies</Text>
          <Text style={styles.subtitle}>Discover innovative solutions with cutting-edge technology.</Text>
          <Link href="/signin" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Let's Begin</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topHalf: {
    height: height * 0.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 60,
    paddingHorizontal: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#ff8c00",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});
