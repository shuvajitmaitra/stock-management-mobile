import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from "react-native";
import { Colors } from "@/constant/Colors";
import LoginCover from "../assets/icons/LoginCover";
import Ionicons from "@expo/vector-icons/Ionicons";
const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleSignIn = () => {
    router.dismissAll();
    router.push("/(tabs)");
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 6;

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);

    if (isEmailValid && isPasswordValid) {
    } else {
      Alert.alert("Error", "Please fix the errors and try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <LoginCover />
        <Text style={styles.title}>Sign in to your account!</Text>
      </View>
      <View style={styles.subContainer}>
        <TextInput
          style={[styles.input, emailError && styles.errorBorder]}
          placeholder="Email"
          placeholderTextColor={Colors.bodyText}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text.toLowerCase());
            setEmailError(false);
          }}
        />
        {emailError && <Text style={styles.errorText}>Invalid email format</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, passwordError && styles.errorBorder]}
            placeholder="Password"
            secureTextEntry={!showPassword} // Toggle visibility here
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(false); // Clear error while typing
            }}
            placeholderTextColor={Colors.bodyText}
          />
          <TouchableOpacity style={styles.toggleButton} onPress={() => setShowPassword((prevState) => !prevState)}>
            <Text style={styles.toggleButtonText}>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>
        {passwordError && <Text style={styles.errorText}>Password must be at least 6 characters</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 40,
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  imageContainer: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    borderRadius: 20,
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
  },
  subContainer: {
    backgroundColor: Colors.secondary,
    padding: 20,
    marginTop: -50,
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    gap: 10,
    padding: 30,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.header,
    justifyContent: "flex-start",
    position: "relative",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: Colors.heading,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 100,
    paddingHorizontal: 10,
    // marginBottom: 10,
    // position: "relative",
    height: 50,
    width: "100%",
    color: Colors.bodyText,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  toggleButton: {
    paddingHorizontal: 10,
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  toggleButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignInScreen;
