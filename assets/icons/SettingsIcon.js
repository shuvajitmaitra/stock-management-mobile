import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SettingsIcon({ size, color, ...props }) {
  return (
    <Svg width={size || 20} height={size || 20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M18.51 8.25c.5 0 .9-.4.9-.9V2.7c0-.5-.4-.9-.9-.9s-.9.4-.9.9v4.65c0 .49.41.9.9.9zM12 15.75c-.5 0-.9.4-.9.9v4.65c0 .5.4.9.9.9s.9-.4.9-.9v-4.65c0-.49-.4-.9-.9-.9zM5.49 8.25c.5 0 .9-.4.9-.9V2.7c0-.5-.4-.9-.9-.9s-.9.4-.9.9v4.65c0 .49.4.9.9.9zM7.35 10.172H3.63c-.5 0-.9.4-.9.9s.4.9.9.9h.96v9.33c0 .5.4.9.9.9s.9-.4.9-.9v-9.33h.96c.5 0 .9-.4.9-.9s-.41-.9-.9-.9zM20.37 10.172h-3.72c-.5 0-.9.4-.9.9s.4.9.9.9h.96v9.33c0 .5.4.9.9.9s.9-.4.9-.9v-9.33h.96c.5 0 .9-.4.9-.9s-.4-.9-.9-.9zM13.86 12.03h-.96V2.7c0-.5-.4-.9-.9-.9s-.9.4-.9.9v9.33h-.96c-.5 0-.9.4-.9.9s.4.9.9.9h3.72c.5 0 .9-.4.9-.9s-.4-.9-.9-.9z"
        fill={color || "#292D32"}
      />
    </Svg>
  );
}

export default SettingsIcon;
