import { TextView } from "react-native-selectable-text";
import { useState } from "react";
import { View, Text } from "react-native";

export default function App() {
  const [selectedText, setSelectedText] = useState("");
  const [selectionRange, setSelectionRange] = useState({ start: 0, end: 0 });

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <View
        style={{ backgroundColor: "lightgray", padding: 20, marginBottom: 20 }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Selection Info:
        </Text>
        <Text>Selected Text: "{selectedText}"</Text>
        <Text>
          Range: {selectionRange.start} - {selectionRange.end}
        </Text>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        TextView Examples (Text-like behavior):
      </Text>

      {/* Basic TextView without explicit height - should auto-size like Text */}
      <TextView
        text="This TextView auto-sizes like a Text component! No height needed."
        style={{
          fontSize: 16,
          marginBottom: 15,
          backgroundColor: "lightblue",
          padding: 10,
        }}
        onTextSelectionChange={(event) => {
          const { selectedText, start, end } = event.nativeEvent;
          setSelectedText(selectedText);
          setSelectionRange({ start, end });
        }}
      />

      {/* Styled TextView */}
      <TextView
        text="Styled TextView with custom colors, bold font, and center alignment."
        style={{
          fontSize: 18,
          color: "purple",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "lightyellow",
          padding: 15,
          marginBottom: 15,
        }}
        onTextSelectionChange={(event) => {
          const { selectedText, start, end } = event.nativeEvent;
          setSelectedText(selectedText);
          setSelectionRange({ start, end });
        }}
      />

      {/* Italic TextView */}
      <TextView
        text="This is italic text with custom line height."
        style={{
          fontSize: 16,
          fontStyle: "italic",
          color: "darkgreen",
          lineHeight: 24,
          backgroundColor: "lightgreen",
          padding: 10,
          marginBottom: 15,
        }}
        onTextSelectionChange={(event) => {
          const { selectedText, start, end } = event.nativeEvent;
          setSelectedText(selectedText);
          setSelectionRange({ start, end });
        }}
      />

      {/* Small text without container styling */}
      <TextView
        text="Small text that wraps naturally like a Text component would."
        style={{ fontSize: 14, color: "gray" }}
        onTextSelectionChange={(event) => {
          const { selectedText, start, end } = event.nativeEvent;
          setSelectedText(selectedText);
          setSelectionRange({ start, end });
        }}
      />
    </View>
  );
}
