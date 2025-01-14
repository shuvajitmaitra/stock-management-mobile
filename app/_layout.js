import SignInScreen from "@/components/SignIn";
import { Colors } from "@/constant/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import StockInIcon from "@/assets/icons/StockInIcon"; // Assuming you have a custom icon
import StockOutIcon from "@/assets/icons/StockOutIcon"; // Assuming you have a custom icon
import HomeIcon from "@/assets/icons/HomeIcon"; // Assuming you have a custom icon

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
            headerStyle: {
              backgroundColor: Colors.header,
              // height: 90,
            },
            headerTitleStyle: {
              color: Colors.white,
            },
            tabBarStyle: {
              backgroundColor: Colors.header,
              borderTopColor: "transparent",
              height: 90,
            },
            tabBarActiveTintColor: Colors.white,
            tabBarInactiveTintColor: Colors.gray,
            headerRight: () => (
              <TouchableOpacity onPress={signOut}>
                <Text style={{ marginRight: 10, color: "blue" }}>Sign Out</Text>
              </TouchableOpacity>
            ),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Dashboard",
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => (
                <View style={focused && styles.tabBarItemContainer}>
                  <HomeIcon size={size} color={color} />
                </View>
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tabs.Screen
            name="stock-in"
            options={{
              headerShown: false,
              title: "Stock In",
              tabBarIcon: ({ color, focused }) => (
                <View style={focused && styles.tabBarItemContainer}>
                  <StockInIcon size={30} color={color} />
                </View>
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tabs.Screen
            name="stock-out"
            options={{
              headerShown: false,
              title: "Stock Out",
              tabBarIcon: ({ color, focused }) => (
                <View style={focused && styles.tabBarItemContainer}>
                  <StockOutIcon size={30} color={color} />
                </View>
              ),
              tabBarLabel: () => null,
            }}
          />
        </Tabs>
      ) : (
        <SignInScreen />
      )}
    </AuthContext.Provider>
  );
}
const styles = StyleSheet.create({
  tabBarItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 7,
  },
});
