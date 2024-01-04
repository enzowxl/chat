import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { SCREENS_AUTH } from "../constants/screens";

export class SignUpScreenUtils {
  async chooseImage(type: string, updatePhoto: any) {
    if (type === "gallery") {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (newStatus !== "granted") {
          Alert.alert(
            "Permission",
            "You rejected the permissions, go into settings and allow app images."
          );
          return;
        }
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        updatePhoto(result.assets[0].uri);
      }
    } else if (type === "camera") {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await ImagePicker.requestCameraPermissionsAsync();
        if (newStatus !== "granted") {
          Alert.alert(
            "Permission",
            "You rejected the permissions, go into settings and allow app images."
          );
          return;
        }
      }
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        updatePhoto(result.assets[0].uri);
      }
    }
  }
}
