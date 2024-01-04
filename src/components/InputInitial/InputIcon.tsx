import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { InputIconPropsType } from "../../types/types";
export default function InputIcon({ icon, side, onPress }: InputIconPropsType) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={icon}
        style={[
          styles.icon,
          side === "Left"
            ? {
                marginLeft: 15,
              }
            : side === "Right"
            ? {
                marginRight: 15,
              }
            : null,
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    tintColor: "#ccc",
  },
});
