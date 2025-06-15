import { ViewProps, TextStyle } from "react-native";
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
export default function ReactNativeSelectableTextView(props: Props): React.JSX.Element;
//# sourceMappingURL=ReactNativeSelectableTextView.d.ts.map