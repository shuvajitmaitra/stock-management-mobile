import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

function StockOutIcon({ size, color, ...props }) {
  return (
    <Svg width={size || 30} height={size || 30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <Path stroke={color || "#000"} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18" />
      <Rect
        width={13}
        height={4}
        x={6}
        y={20}
        fill={color || "#000"}
        stroke={color || "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        rx={2}
        transform="rotate(-90 6 20)"
      />
      <Rect
        width={9}
        height={4}
        x={14}
        y={16}
        fill={color || "#000"}
        stroke={color || "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        rx={2}
        transform="rotate(-90 14 16)"
      />
    </Svg>
  );
}

export default StockOutIcon;
