import { ViewProps, TextStyle, View, Text } from "react-native";
import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";

export type OnTextSelectionChangeEvent = {
  selectedText: string;
  start: number;
  end: number;
};

export type Props = {
  text?: string;
  style?: TextStyle;
  onTextSelectionChange?: (event: {
    nativeEvent: OnTextSelectionChangeEvent;
  }) => void;
} & Omit<ViewProps, "style">;

const NativeView: React.ComponentType<Props> = requireNativeViewManager(
  "ReactNativeSelectableText"
);

const defaultStyle: TextStyle = {
  fontSize: 16,
  color: "black",
  fontWeight: "normal",
};

export default function ReactNativeSelectableTextView(props: Props) {
  const { style, ...otherProps } = props;

  return (
    <View>
      <NativeView
        style={{
          ...defaultStyle,
          ...style,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
        {...otherProps}
      />
      <Text
        style={[
          defaultStyle,
          style,
          { opacity: 0, pointerEvents: "none", color: "#000" },
        ]}
      >
        {props.text}
      </Text>
    </View>
  );
}
