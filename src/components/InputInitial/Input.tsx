import { TextInput, StyleSheet, View } from "react-native";
import { useState } from "react";
import { InputPropsType } from "../../types/types";
import { COLORS } from "../../constants";
export default function Input({
  placeholder,
  value,
  onChangeText,
  minHeight,
  securePass,
}: InputPropsType) {
  return (
    <View style={[styles.inputView, { minHeight: minHeight ? minHeight : 50 }]}>
      <TextInput
        secureTextEntry={securePass}
        placeholderTextColor={COLORS.gray}
        placeholder={placeholder}
        style={styles.input}
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
