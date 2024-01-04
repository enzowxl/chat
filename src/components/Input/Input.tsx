import { TextInput, StyleSheet, View } from "react-native";
import { useState } from "react";
import { InputPropsType } from "../../types/types";
import { COLORS } from "../../constants";
export default function Input({
  placeholder,
  value,
  onChangeText,
  minHeight,
  multiline,
  onBlur,
  onFocus,
}: InputPropsType) {
  const [inputHeight, updateInputHeight] = useState(0);

  return (
    <View style={[styles.inputView, { minHeight: minHeight ? minHeight : 50 }]}>
      <TextInput
        blurOnSubmit
        onBlur={onBlur}
        onFocus={onFocus}
        returnKeyType="done"
        keyboardAppearance="dark"
        placeholderTextColor={COLORS.gray}
        placeholder={placeholder}
        style={[styles.input, { height: inputHeight }]}
        onContentSizeChange={(s) =>
          updateInputHeight(s.nativeEvent.contentSize.height + 12)
        }
        multiline={multiline ? true : false}
        value={value}
        onChangeText={(t) => onChangeText(t)}
        cursorColor={"#ccc"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    borderRadius: 10,
    backgroundColor: COLORS.gray_e,
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  input: {
    color: COLORS.gray,
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
});
