import { Platform, KeyboardAvoidingView, StyleSheet } from "react-native";
import { InputRootPropsType } from "../../types/types";
import { COLORS } from "../../constants";
export default function InputRoot({ children }: InputRootPropsType) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.footer}
      enabled={Platform.OS === "ios"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.trans,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
