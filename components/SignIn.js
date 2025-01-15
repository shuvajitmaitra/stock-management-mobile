import { saveToStorage, storeData } from "@/utils/commonFunction";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";

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
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 6;

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      console.log("email", email);
      console.log("password", password);
      saveToStorage("email", email);
      saveToStorage("password", password);
    } else {
      Alert.alert("Error", "Please fix the errors and try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={[styles.input, emailError && styles.errorBorder]}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text.toLowerCase());
          setEmailError(false); // Clear error while typing
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    maxHeight: 50,
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    // marginBottom: 10,
    flex: 1,
    // position: "relative",
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
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignInScreen;
