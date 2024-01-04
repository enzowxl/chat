import { Switch, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ModalButtonPropsType } from "../../types/types";
import { COLORS } from "../../constants";

export default function ModalButton({
  title,
  onPress,
}: ModalButtonPropsType) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  txt: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.white,
  },
});
