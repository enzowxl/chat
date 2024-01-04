import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";
import { COLORS } from "../../constants";

export default function TabButton(props: any) {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<any>(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5, rotate: "0deg" },
        1: { scale: 1.3, rotate: "360deg" },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.3, rotate: "360deg" },
        1: { scale: 1, rotate: "0deg" },
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <Image
          style={[styles.image, focused ? { tintColor: COLORS.white } : null]}
          source={item?.image}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray_e,
  },
});
