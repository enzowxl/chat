import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  View,
  Pressable,
} from "react-native";
import { COLORS } from "../../constants";
import { SCREENS_STACK_PRIMARY } from "../../constants/screens";
import Photo from "../Photo";
import { useContext, useRef, useState } from "react";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomModal } from "../BottomSheetModal";
import { ref, set, update } from "firebase/database";
import { db } from "../../db";
import { AuthContext } from "../../provider/authentication";

export default function Chats(props: any) {
  const { dismiss, dismissAll } = useBottomSheetModal();

  const { width } = useWindowDimensions();

  const { user } = useContext(AuthContext);

  const date = new Date(props.item?.lastMessage?.hour);
  const options = {
    timeZone: "America/Sao_Paulo", //New_York
    hour: "numeric",
    minute: "numeric",
  } as {};
  const formattedDate = date.toLocaleString("pt-BR", options);

  function navigateChat() {
    dismissAll();
    const nav = props.navigation.navigate;
    nav(SCREENS_STACK_PRIMARY.CHAT, {
      id: props.item?.id,
    });
  }

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  function Options() {
    bottomSheetModalRef?.current?.present();
  }

  function Favorite() {
    if (props.item?.favorite) {
      update(ref(db, `users/${user?.id}/friends/${props.item?.id}`), {
        favorite: null,
      });
    } else {
      update(ref(db, `users/${user?.id}/friends/${props.item?.id}`), {
        favorite: true,
      });
    }
  }

  function Unfriend() {
    set(ref(db, `users/${user?.id}/friends/${props.item?.id}`), null);
    set(ref(db, `users/${props.item?.id}/friends/${user?.id}`), null);
    set(ref(db, `users/${props.item?.id}/chats/${user?.id}`), null);
    set(ref(db, `users/${user?.id}/chats/${props.item?.id}`), null);
  }

  return (
    <TouchableOpacity
      onLongPress={Options}
      onPress={navigateChat}
      style={[styles.container, { width: width - 30 }]}
    >
      <Photo
        favorite={props.item?.favorite}
        admin={props.item?.admin}
        photo={props.item?.photo}
        size={50}
      />
      <View style={styles.content}>
        <Text style={styles.name}>
          {props.item?.name}
          {props.item?.lastName ? ` ${props.item?.lastName}` : null}
        </Text>
        {props.item?.lastMessage && (
          <Text style={styles.message}>
            {props.item?.lastMessage?.message.length >= 30
              ? `${props.item?.lastMessage?.message.slice(0, 30)}...`
              : props.item?.lastMessage?.message}
          </Text>
        )}
      </View>
      <View>
        <Text style={styles.hour}>
          {props.item?.lastMessage?.hour ? formattedDate : null}
        </Text>
        {props.item?.unreadMessages > 0 && (
          <View style={styles.containerUnreadMessages}>
            <Text style={styles.unreadMessages}>
              {props.item?.unreadMessages}
            </Text>
          </View>
        )}
      </View>
      <BottomModal.ModalRoot
        index={0}
        points={["20%"]}
        ref={bottomSheetModalRef}
      >
        <BottomModal.ModalSwitch
          onPress={Favorite}
          state={props.item?.favorite}
          title={"Favorite"}
        />

        <BottomModal.ModalButton onPress={Unfriend} title={"Unfriend"} />
      </BottomModal.ModalRoot>
    </TouchableOpacity>
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
