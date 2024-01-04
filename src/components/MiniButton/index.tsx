import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { COLORS, IMAGES } from "../../constants";
import { MiniButtonPropsType } from "../../types/types";

export default function MiniButton({
  onPress,
  icon,
  isFriend,
}: MiniButtonPropsType) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {isFriend ? (
          <Image style={styles.image} source={IMAGES.chat} />
        ) : (
          <Image style={styles.image} source={icon} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 15,
    height: 15,
    tintColor: COLORS.white,
  },
  imageContainer: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
