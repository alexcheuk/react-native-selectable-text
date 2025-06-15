import { View, Text } from "react-native";
import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";
const NativeView = requireNativeViewManager("ReactNativeSelectableText");
const defaultStyle = {
    fontSize: 16,
    color: "black",
    fontWeight: "normal",
};
export default function ReactNativeSelectableTextView(props) {
    const { style, ...otherProps } = props;
    return (<View>
      <NativeView style={{
            ...defaultStyle,
            ...style,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
        }} {...otherProps}/>
      <Text style={[
            defaultStyle,
            style,
            { opacity: 0, pointerEvents: "none", color: "#000" },
        ]}>
        {props.text}
      </Text>
    </View>);
}
//# sourceMappingURL=ReactNativeSelectableTextView.js.map