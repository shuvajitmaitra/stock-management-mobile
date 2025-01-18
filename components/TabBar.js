import React, { useEffect } from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import { Colors } from "@/constant/Colors";

const { width } = Dimensions.get("window");

function TabBar({ state, descriptors, navigation }) {
  const tabWidth = width / 1.5 / state.routes.length;
  const activeTabPosition = useSharedValue(0);

  // Use useEffect to update the shared value
  useEffect(() => {
    activeTabPosition.value = withTiming(state.index * tabWidth + tabWidth / 2 - 25, {
      duration: 250,
    });
  }, [state.index, tabWidth]);

  return (
    <View style={{ backgroundColor: Colors.header }}>
      <View style={styles.tabBarContainer}>
        {/* Animated Circular Background for Active Tab */}
        <Animated.View
          style={[
            styles.activeBackground,
            useAnimatedStyle(() => ({
              transform: [{ translateX: activeTabPosition.value }],
            })),
          ]}
        />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // Icon Bounce Animation for Active Tab
          const animatedIconStyle = useAnimatedStyle(() => ({
            transform: [{ scale: withSpring(isFocused ? 1.4 : 1) }],
          }));

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tab, { width: tabWidth }]}
            >
              <Animated.View style={animatedIconStyle}>
                <View style={[styles.icon, { backgroundColor: isFocused ? "#999" : "#B0BEC5" }]}>
                  <Text>{route.name === "index" ? "🏠" : route.name === "stock-in" ? "📥" : "📤"}</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: Colors.secondary,
    borderRadius: 50,
    paddingVertical: 15,
    position: "relative",
    alignSelf: "center",
    marginBottom: 10,
  },
  activeBackground: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    top: 5, // Adjust for proper alignment vertically
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
