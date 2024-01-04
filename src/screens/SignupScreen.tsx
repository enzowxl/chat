import {
  Image as ImageRn,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useContext, useRef } from "react";
import { COLORS, IMAGES, SCREENS_NO_AUTH } from "../constants";
import { Input } from "../components/InputInitial";
import { AuthContext } from "../provider/authentication";
import { BottomModal } from "../components/BottomSheetModal";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { SignUpScreenUtils } from "../utils/SignUpScreen";
import ButtonInitial from "../components/ButtonInitial";
import Photo from "../components/Photo";

export default function SignUpScreen({ navigation }: any) {
  const [name, updateName] = useState<string>("");
  const [lastName, updateLastName] = useState<string>("");
  const [email, updateEmail] = useState<string>("");
  const [password, updatePassword] = useState<string>("");
  const [cpassword, updateCPassword] = useState<string>("");
  const [photo, updatePhoto] = useState<string>("");

  const [securePass, updateSecurePass] = useState<boolean>(true);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { dismissAll } = useBottomSheetModal();

  const { signUp } = useContext(AuthContext);

  function goBack() {
    navigation.goBack();
  }

  function chooseImage() {
    bottomSheetModalRef.current?.present();
  }

  function Image(type: string) {
    new SignUpScreenUtils().chooseImage(type, updatePhoto).then(() => {
      //dismissAll();
    });
  }

  function viewPass() {
    updateSecurePass(!securePass);
  }

  function resetAndNavigate() {
    updateName("");
    updateLastName("");
    updateEmail("");
    updatePassword("");
    updateCPassword("");
    updatePhoto("");
    navigation.navigate(SCREENS_NO_AUTH.SIGNIN);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity onPress={goBack} style={styles.back}>
        <ImageRn
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
      <ImageRn style={styles.img} source={IMAGES.men} />
      <Text style={styles.txt}>Sign up</Text>
      <Input.Root>
        <Input.Input
          value={name}
          onChangeText={updateName}
          minHeight={60}
          placeholder="Name"
        />
      </Input.Root>
      <Input.Root>
        <Input.Input
          value={lastName}
          onChangeText={updateLastName}
          minHeight={60}
          placeholder="Last name"
        />
      </Input.Root>
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
          securePass={securePass}
          value={password}
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
      <Input.Root>
        <Input.Input
          securePass={securePass}
          value={cpassword}
          onChangeText={updateCPassword}
          minHeight={60}
          placeholder="Confirm password"
        />
        <Input.Icon
          icon={securePass ? IMAGES.pass_unvisible : IMAGES.pass_visible}
          side={"Left"}
          onPress={viewPass}
        />
      </Input.Root>
      <ButtonInitial
        textColor={COLORS.gray}
        color={COLORS.gray_e}
        onPress={chooseImage}
        label="Choose photo"
        back
      />
      <View style={{ marginTop: 25 }}>
        <ButtonInitial
          onPress={() => {
            signUp({
              name,
              lastName,
              email,
              password,
              cpassword,
              photo,
              resetAndNavigate,
            });
          }}
          label="Next"
          back
        />
      </View>
      <BottomModal.ModalRoot
        ref={bottomSheetModalRef}
        index={0}
        points={["35%"]}
      >
        <View style={{ marginTop: 15, alignItems: "center" }}>
          <Photo photo={photo} size={100} />
        </View>
        <BottomModal.ModalButton
          onPress={() => Image("camera")}
          title="Camera"
        />
        <BottomModal.ModalButton
          onPress={() => Image("gallery")}
          title="Gallery"
        />
      </BottomModal.ModalRoot>
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
