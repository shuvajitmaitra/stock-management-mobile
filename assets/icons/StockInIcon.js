import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

function StockInIcon({ color, size, ...props }) {
  return (
    <Svg width={size || 30} height={size || 30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
      <Path stroke={color || "#000"} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 20h18" />
      <Rect
        width={13}
        height={4}
        x={6}
        y={17}
        fill={color || "#000"}
        stroke={color || "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        rx={2}
        transform="rotate(-90 6 17)"
      />
      <Rect
        width={9}
        height={4}
        x={14}
        y={17}
        fill={color || "#000"}
        stroke={color || "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        rx={2}
        transform="rotate(-90 14 17)"
      />
    </Svg>
  );
}

export default StockInIcon;
