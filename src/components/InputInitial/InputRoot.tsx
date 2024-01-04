import { Platform, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { InputRootPropsType } from "../../types/types";
import { COLORS } from "../../constants";
export default function InputRoot({ children }: InputRootPropsType) {
  return <View style={styles.footer}>{children}</View>;
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 30,
    backgroundColor: COLORS.trans,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});
