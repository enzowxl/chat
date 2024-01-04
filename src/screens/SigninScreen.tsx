import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useContext, useState } from "react";
import { COLORS, IMAGES } from "../constants";
import ButtonInitial from "../components/ButtonInitial";
import { Input } from "../components/InputInitial";
import { AuthContext } from "../provider/authentication";

export default function SignInScreen({ navigation }: any) {
  const [email, updateEmail] = useState<string>("");
  const [password, updatePassword] = useState<string>("");

  const [securePass, updateSecurePass] = useState<boolean>(true);

  const { signIn } = useContext(AuthContext);

  function goBack() {
    navigation.goBack();
  }

  function viewPass() {
    updateSecurePass(!securePass);
  }

  function resetAndNavigate() {
    updateEmail("");
    updatePassword("");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity onPress={goBack} style={styles.back}>
        <Image
          style={[
            styles.image,
            Platform.OS === "ios"
              ? {
                  top: 30,
                }
              : null,
          ]}
          source={IMAGES.back}
        />
      </TouchableOpacity>
      <Image style={styles.img} source={IMAGES.women} />
      <Text style={styles.txt}>Sign in</Text>
      <Input.Root>
        <Input.Input
          value={email}
          onChangeText={updateEmail}
          minHeight={60}
          placeholder="Email"
        />
      </Input.Root>
      <Input.Root>
        <Input.Input
          value={password}
          securePass={securePass}
          onChangeText={updatePassword}
          minHeight={60}
          placeholder="Password"
        />
        <Input.Icon
          icon={securePass ? IMAGES.pass_unvisible : IMAGES.pass_visible}
          side={"Left"}
          onPress={viewPass}
        />
      </Input.Root>
      <View style={{ marginTop: 25 }}>
        <ButtonInitial
          onPress={() =>
            signIn({
              email,
              password,
              resetAndNavigate,
            })
          }
          label="Next"
          back
        />
      </View>
    </KeyboardAvoidingView>
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
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  txt: {
    fontSize: 30,
    color: COLORS.white,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    marginBottom: 35,
  },
  image: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
  },
  back: {
    position: "absolute",
    top: 30,
    left: 15,
  },
});
