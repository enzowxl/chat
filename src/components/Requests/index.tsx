import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  View,
} from "react-native";
import { COLORS, IMAGES } from "../../constants";
import Photo from "../Photo";
import MiniButton from "../MiniButton";
import { push, ref, remove, set } from "firebase/database";
import { db } from "../../db";
import { useContext } from "react";
import { AuthContext } from "../../provider/authentication";

export default function Requests(props: any) {
  const { width } = useWindowDimensions();

  const { user } = useContext(AuthContext);

  function Accept() {
    set(ref(db, `users/${user?.id}/myRequests/${props.item?.id}`), null);
    set(ref(db, `users/${user?.id}/friends/${props.item?.id}`), {
      id: props.item?.id,
      name: props.item?.name,
      lastName: props.item?.lastName,
      email: props.item?.email,
      photo: props.item?.photo ? props.item?.photo : false,
    });
    set(ref(db, `users/${props.item?.id}/friends/${user?.id}`), {
      id: user?.id,
      name: user?.name,
      lastName: user?.lastName,
      email: user?.email,
      photo: user?.photo ? user?.photo : false,
    });
  }

  function Recuse() {
    set(ref(db, `users/${user?.id}/myRequests/${props.item?.id}`), null);
  }

  return (
    <View style={[styles.container, { width: width - 30 }]}>
      <Photo photo={props.item?.photo} size={50} />
      <View style={styles.content}>
        <Text style={styles.name}>
          {props.item?.name}
          {props.item?.lastName ? ` ${props.item?.lastName}` : null}
        </Text>
      </View>
      <View style={{ marginRight: 15 }}>
        <MiniButton onPress={Accept} icon={IMAGES.check} />
      </View>
      <MiniButton onPress={Recuse} icon={IMAGES.close} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: COLORS.gray_e,
    marginBottom: 15,
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: COLORS.white,
  },
  message: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: COLORS.primary,
  },
  hour: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    color: COLORS.white,
    alignSelf: "center",
  },
  unreadMessages: {
    fontSize: 13,
    color: COLORS.white,
    alignSelf: "center",
  },
  containerUnreadMessages: {
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    padding: 5,
    marginTop: 10,
  },
});
