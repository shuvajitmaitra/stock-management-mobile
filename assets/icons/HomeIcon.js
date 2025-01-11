import * as React from "react";
import Svg, { Path } from "react-native-svg";

function HomeIcon({ color, size, ...props }) {
  return (
    <Svg width={size || 20} height={size || 20} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M1 6v9h5v-4a2 2 0 114 0v4h5V6L8 0 1 6z" fill={color || "#000"} />
    </Svg>
  );
}

export default HomeIcon;
