import React, { useEffect, useState } from "react";
import { Colors } from "@/constant/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { StockProvider } from "@/context/StockContext";
import TabBar from "../../components/TabBar";
import * as Updates from "expo-updates";
export default function TabLayout() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    async function checkForUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          console.log("New update available:", update);
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        } else {
          console.log("No update available");
        }
      } catch (e) {
        console.error("Update error:", e);
      }
    }
    checkForUpdates();
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
          }}
        />
        <Tabs.Screen
          name="stock-in"
          options={{
            headerShown: false,
            title: "Stock In",
          }}
        />
        <Tabs.Screen
          name="stock-out"
          options={{
            headerShown: false,
            title: "Stock Out",
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
