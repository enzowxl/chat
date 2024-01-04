import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { COLORS, IMAGES } from "../../constants";
import { HeaderPropsType } from "../../types/types";

export default function Header({
  title,
  status,
  icon,
  back,
  navigation,
}: HeaderPropsType) {
  function Back() {
    const nav = navigation?.goBack;
    if (back === true || false) return nav();

    return back();
  }

  return (
    <View style={styles.header}>
      <View style={styles.cont}>
        {back ? (
          <View style={styles.left}>
            <TouchableOpacity onPress={Back}>
              <Image
                style={[styles.image, { marginRight: 15 }]}
                source={IMAGES.back}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
          </View>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
        {icon?.icon && (
          <TouchableOpacity onPress={icon.onPress}>
            <Image style={styles.image} source={icon.icon} />
            {icon.notification ? <View style={styles.status} /> : null}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    paddingHorizontal: 15,
    zIndex: 99,
    backgroundColor: COLORS.back,
  },
  title: {
    fontSize: 30,
    color: COLORS.white,
    fontFamily: "Poppins_600SemiBold",
    paddingBottom: 10,
  },
  cont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    tintColor: COLORS.white,
    width: 25,
    height: 25,
    bottom: 5,
  },
  status: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    top: -12,
    right: -2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
});
