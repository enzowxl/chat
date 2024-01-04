import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, IMAGES, SCREENS_NO_AUTH } from "../constants";
import ButtonInitial from "../components/ButtonInitial";

export default function InitialScreen({ navigation }: any) {
  function navigateSignUp() {
    navigation.navigate(SCREENS_NO_AUTH.SIGNUP);
  }

  function navigateSignIn() {
    navigation.navigate(SCREENS_NO_AUTH.SIGNIN);
  }

  return (
    <View style={styles.container}>

      <Image style={styles.img} source={IMAGES.icon_png} />
      <Text style={styles.txt}>
        Chat with friends and family instantly on our intuitive chat app.
      </Text>
      <ButtonInitial onPress={navigateSignUp} label="Sign up" back />
      <ButtonInitial onPress={navigateSignIn} label="Sign in" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.back,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  txt: {
    fontSize: 30,
    color: COLORS.white,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    marginBottom: 150,
  },
});
