import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { ButtonInitialPropsTypes } from "../../types/types";
import { COLORS } from "../../constants";

export default function ButtonInitial({
  back,
  onPress,
  label,
  color,
  textColor,
}: ButtonInitialPropsTypes) {
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          width: width - 60,
        },
        back
          ? {
              backgroundColor: color ? color : COLORS.primary,
            }
          : {
              backgroundColor: COLORS.trans,
              borderWidth: 1,
              borderColor: COLORS.primary,
            },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor ? textColor : COLORS.white,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 15,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
});
