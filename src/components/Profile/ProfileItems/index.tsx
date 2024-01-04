import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { COLORS } from "../../../constants";
import { ProfileItemsPropsType } from "../../../types/types";

export default function ProfileItems({
  label,
  title,
  icon,
  onPress,
}: ProfileItemsPropsType) {
  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>{title}</Text>
      {icon ? (
        <View style={styles.containerIn}>
          <Text style={styles.text2}>{label}</Text>
          <TouchableOpacity onPress={onPress}>
            <Image style={styles.img} source={icon} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.containerIn}>
          <Text style={styles.text2}>{label}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 15,
    height: 15,
    tintColor: COLORS.gray,
    marginLeft: 10,
  },
  container: {
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.white,
  },
  text2: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: COLORS.white,
  },
  containerIn: {
    height: 50,
    backgroundColor: COLORS.gray_e,
    marginLeft: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    flex: 1,
    flexDirection: "row",
  },
});
