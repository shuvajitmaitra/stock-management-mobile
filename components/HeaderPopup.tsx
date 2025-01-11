import { StyleSheet, Text } from "react-native";
import React from "react";
import Popover, { Rect } from "react-native-popover-view";

// Define the type for `position`
interface Position {
  x: number;
  y: number;
}

interface HeaderPopupProps {
  position?: Position | null; // Updated to match index.tsx type
  setPosition: (position: Position | null) => void; // Allow null in setPosition
}

const HeaderPopup: React.FC<HeaderPopupProps> = ({ position, setPosition }) => {
  console.log("pos", JSON.stringify(position, null, 2));
  // Updated type checking to handle the new position type

  return (
    <Popover
      popoverStyle={styles.popoverStyle}
      from={new Rect(position?.x ?? 0, position?.y ?? 0, 0, 0)}
      isVisible={Boolean(position)}
      onRequestClose={() => {
        setPosition(null);
      }}
    >
      <Text>Hello</Text>
    </Popover>
  );
};

export default HeaderPopup;

const styles = StyleSheet.create({
  popoverStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    backgroundColor: "white",
  },
});
