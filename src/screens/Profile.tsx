import { StyleSheet, View, ToastAndroid, Platform, Alert } from "react-native";
import { COLORS, IMAGES } from "../../src/constants";
import * as Clipboard from "expo-clipboard";
import Header from "../components/Header";
import Profile from "../components/Profile";
import ProfileItems from "../components/Profile/ProfileItems";
import { Video } from "expo-av";
import { useContext } from "react";
import { AuthContext } from "../provider/authentication";

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);

  async function copyText(id: string) {
    if (Platform.OS === "ios") {
      await Clipboard.setStringAsync(id);
      return Alert.alert("Sucess", "Message copied to clipboard");
    } else {
      await Clipboard.setStringAsync(id);
      return ToastAndroid.show("Id copied to clipboard", ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <View style={styles.cont}>
        <Profile item={user} />
      </View>
      <ProfileItems title={"Email"} label={user?.email as string} />
      <ProfileItems
        onPress={() => copyText(user?.id as string)}
        title={"Id"}
        label={user?.id as string}
        icon={IMAGES.copy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.back,
  },
  cont: {
    alignItems: "center",
  },
});
