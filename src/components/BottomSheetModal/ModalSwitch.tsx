import { Switch, View, Text, StyleSheet } from "react-native";
import { ModalSwitchPropsType } from "../../types/types";
import { COLORS } from "../../constants";

export default function ModalSwitch({
  title,
  state,
  onPress,
}: ModalSwitchPropsType) {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{title}</Text>
      <Switch
        trackColor={{
          false: COLORS.back,
          true: COLORS.back,
        }}
        thumbColor={state ? COLORS.primary : COLORS.gray}
        onValueChange={onPress}
        value={state}
      />
    </View>
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
