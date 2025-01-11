import SignInScreen from "@/components/SignIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

// Context for Authentication
export const AuthContext = createContext({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
});

export default function RootLayout() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = () => setIsSignedIn(true);
  const signOut = () => {
    AsyncStorage.removeItem("email");
    AsyncStorage.removeItem("password");
    setIsSignedIn(false);
  };
  useEffect(() => {
    const checkSignIn = async () => {
      const value = await AsyncStorage.getItem("email");

      if (value) {
        setIsSignedIn(true);
      }
    };

    checkSignIn();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {isSignedIn ? (
        <Tabs
          screenOptions={{
            headerRight: () => (
              <TouchableOpacity onPress={signOut}>
                <Text style={{ marginRight: 10, color: "blue" }}>Sign Out</Text>
              </TouchableOpacity>
            ),
          }}
        >
          <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
          <Tabs.Screen name="stock-in" options={{ title: "Stock In" }} />
          <Tabs.Screen name="stock-out" options={{ title: "Stock Out" }} />
        </Tabs>
      ) : (
        <SignInScreen />
      )}
    </AuthContext.Provider>
  );
}
