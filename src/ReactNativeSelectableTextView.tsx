import { ViewProps, TextStyle } from "react-native";
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

export default function ReactNativeSelectableTextView(props: Props) {
  return <NativeView {...props} />;
}
