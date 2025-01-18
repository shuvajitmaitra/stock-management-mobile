import React, { useEffect, useState } from "react";
import { Colors } from "@/constant/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import StockInIcon from "@/assets/icons/StockInIcon";
import StockOutIcon from "@/assets/icons/StockOutIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import { StockProvider } from "@/context/StockContext";
import TabBar from "../../components/TabBar";

export default function TabLayout() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const checkSignIn = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        const myObject = JSON.parse(jsonValue);
        const email = myObject.email;
        if (email) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error("Error checking sign in", error);
        setIsSignedIn(false);
      }
    };

    checkSignIn();
  }, []);

  // While checking for authentication, you might want to show a loading spinner
  if (isSignedIn === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <StockProvider>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            headerShown: false,
            //   tabBarIcon: ({ color, size, focused }) => (
            //     <View style={focused && styles.tabBarItemContainer}>
            //       <HomeIcon size={size} color={color} />
            //     </View>
            //   ),
            //   tabBarLabel: () => null,
          }}
        />
        <Tabs.Screen
          name="stock-in"
          options={{
            headerShown: false,
            title: "Stock In",
            //   tabBarIcon: ({ color, focused }) => (
            //     <View style={focused && styles.tabBarItemContainer}>
            //       <StockInIcon size={30} color={color} />
            //     </View>
            //   ),
            //   tabBarLabel: () => null,
          }}
        />
        <Tabs.Screen
          name="stock-out"
          options={{
            headerShown: false,
            title: "Stock Out",
            // tabBarIcon: ({ color, focused }) => (
            //   <View style={focused && styles.tabBarItemContainer}>
            //     <StockOutIcon size={30} color={color} />
            //   </View>
            // ),
            // tabBarLabel: () => null,
          }}
        />
      </Tabs>
    </StockProvider>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
