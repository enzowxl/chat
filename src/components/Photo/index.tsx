import { Image, View, StyleSheet } from "react-native";
import { COLORS, IMAGES } from "../../constants";
import { PhotoPropsType } from "../../types/types";

export default function Photo({
  photo,
  status,
  size,
  admin,
  favorite,
}: PhotoPropsType) {
  return (
    <View
      style={{
        backgroundColor: photo || admin ? COLORS.trans : COLORS.primary,
        borderRadius: 100,
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={
          admin
            ? IMAGES.icon
            : photo
            ? {
                uri: photo,
              }
            : IMAGES.no_photo
        }
        style={[
          {
            width:
              size >= 80
                ? photo || admin
                  ? size
                  : size - 30
                : photo || admin
                ? size
                : size - 15,
            height:
              size >= 80
                ? photo || admin
                  ? size
                  : size - 30
                : photo || admin
                ? size
                : size - 15,
            borderRadius: photo || admin ? 100 : 0,
            tintColor: photo || admin ? (null as any) : COLORS.gray_e,
          },
        ]}
      />
      {favorite ? <Image style={styles.fav} source={IMAGES.star} /> : null}
      {status ? <View style={styles.status} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: "green",
    borderRadius: 100,
    bottom: 2,
    right: 2,
  },
  fav: {
    width: 20,
    height: 20,
    top: -5,
    left: -5,
    position: "absolute",
    tintColor: "gold",
  },
});
