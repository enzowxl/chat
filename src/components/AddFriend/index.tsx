import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  View,
  Platform,
  ToastAndroid,
  Alert,
} from "react-native";
import { COLORS, IMAGES } from "../../constants";
import Photo from "../Photo";
import MiniButton from "../MiniButton";
import { onValue, push, ref, set } from "firebase/database";
import { db } from "../../db";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/authentication";
import { SCREENS_STACK_PRIMARY } from "../../constants/screens";

export default function AddFriend(props: any) {
  const [friend, updateFriend] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    (() => {
      updateFriend(false);
      onValue(ref(db, `users/${user?.id}`), (snap) => {
        updateFriend(props.item?.id in snap.val().friends);
      });
    })();
  }, []);

  function addFriend() {
    if (friend) {
      const nav = props.navigation.navigate;
      nav(SCREENS_STACK_PRIMARY.CHAT, {
        id: props.item?.id,
      });
      return;
    }
    set(ref(db, `users/${props.item?.id}/myRequests/${user?.id}`), {
      id: user?.id,
      name: user?.name,
      lastName: user?.lastName,
      email: user?.email,
      photo: user?.photo ? user?.photo : false,
    });
    Platform.OS === "ios"
      ? Alert.alert("Sucess", "Your request was sent successfully")
      : ToastAndroid.show(
          "Your request was sent successfully",
          ToastAndroid.SHORT
        );
  }

  return (
    <View style={styles.container}>
      <Photo photo={props.item?.photo} size={60} />
      <Text style={styles.name}>
        {props.item?.name} {props.item?.lastName}
      </Text>
      <MiniButton isFriend={friend} onPress={addFriend} icon={IMAGES.plus} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: 170,
    backgroundColor: COLORS.gray_e,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  name: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: COLORS.white,
    marginVertical: 10,
  },
});
