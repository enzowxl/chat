import {
  Platform,
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
  ToastAndroid,
  Alert,
} from "react-native";
import { COLORS, IMAGES } from "../../constants";
import { Video, ResizeMode } from "expo-av";
import { useRef, useState, useContext } from "react";
import { BottomModal } from "../BottomSheetModal";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { SCREENS_AUTH } from "../../constants/screens";
import { AuthContext } from "../../provider/authentication";
import * as Clipboard from "expo-clipboard";
import { ref, set } from "firebase/database";
import { db } from "../../db";

export default function Messages(props: any) {
  const { user } = useContext(AuthContext);

  const myMessage = props.item?.author === user?.id;
  const lastMessage = props.index === props.data.length - 1;
  const firstMessage = props.index === 0;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { dismissAll } = useBottomSheetModal();

  const date = new Date(props.item?.hour);
  const options = {
    timeZone: "America/Sao_Paulo",
    hour: "numeric",
    minute: "numeric",
  } as {};

  const formattedDate = date.toLocaleString("pt-BR", options);

  const Points = () => {
    const message = props.item;
    if (message.type === "text" && myMessage) {
      return ["30%"];
    } else if (message.type === "text" && !myMessage) {
      return ["30%"];
    } else {
      return ["20%"];
    }
  };

  function Options() {
    bottomSheetModalRef?.current?.present();
  }

  function Delete() {
    if (!myMessage) {
      set(
        ref(
          db,
          `users/${user?.id}/chats/${props?.id}/messages/${props.item.key}`
        ),
        null
      );
    } else if (myMessage) {
      Alert.alert("Attencion", "Choose how you want to delete the message.", [
        {
          text: "ALL",
          onPress: () => {
            set(
              ref(
                db,
                `users/${user?.id}/chats/${props?.id}/messages/${props.item.key}`
              ),
              null
            );
            set(
              ref(
                db,
                `users/${props?.id}/chats/${user?.id}/messages/${props.item.key}`
              ),
              null
            );
          },
        },
        {
          text: "ME",
          onPress: () => {
            set(
              ref(
                db,
                `users/${user?.id}/chats/${props?.id}/messages/${props.item.key}`
              ),
              null
            );
          },
        },
      ]);
    }
  }

  async function Copy() {
    if (Platform.OS === "ios") {
      await Clipboard.setStringAsync(props.item?.message);
      return Alert.alert("Sucess", "Message copied to clipboard");
    } else {
      await Clipboard.setStringAsync(props.item?.message);
      return ToastAndroid.show(
        "Message copied to clipboard",
        ToastAndroid.SHORT
      );
    }
  }

  function Favorite() {}

  function viewMedia() {
    const nav = props.navigation.navigate;
    const item = props.item;
    const media = item?.type === "image" ? "image" : "video";
    dismissAll();
    nav(SCREENS_AUTH.MEDIA_CHAT, {
      media: media === "image" ? item?.image : item?.video,
      type: media,
      typeMedia: media,
      message: false,
    });
  }

  return (
    <Pressable
      onLongPress={Options}
      style={[
        styles.messageContainer,
        {
          marginBottom: firstMessage ? 20 : null,
          backgroundColor: myMessage ? COLORS.gray_e : COLORS.primary,
          alignSelf: myMessage ? "flex-end" : "flex-start",
        },
      ]}
    >
      {props.item?.type === "image" && (
        <Pressable
          onPress={viewMedia}
          onLongPress={Options}
          style={[styles.mediaContainer, { backgroundColor: COLORS.trans }]}
        >
          <Image style={styles.media} source={{ uri: props.item?.image }} />
        </Pressable>
      )}
      {props.item?.type === "video" && (
        <Pressable
          onPress={viewMedia}
          onLongPress={Options}
          style={styles.mediaContainer}
        >
          <Video
            isMuted={false}
            volume={1}
            videoStyle={{ backgroundColor: COLORS.back }}
            useNativeControls={false}
            source={{ uri: props.item?.video }}
            shouldPlay={false}
            style={styles.media}
            resizeMode={ResizeMode.CONTAIN}
          />
        </Pressable>
      )}
      <Text
        style={[
          styles.messageText,
          {
            color: myMessage ? COLORS.primary : COLORS.white,
          },
        ]}
      >
        {props.item?.message}
      </Text>
      <Text style={styles.dateText}>{formattedDate}</Text>
      <BottomModal.ModalRoot
        ref={bottomSheetModalRef}
        index={0}
        points={Points()}
      >
        {!myMessage && (
          <BottomModal.ModalButton
            onPress={Delete}
            title="Delete message for me"
          />
        )}
        {myMessage && (
          <BottomModal.ModalButton onPress={Delete} title="Delete message" />
        )}
        {props.item?.type === "text" && (
          <BottomModal.ModalButton onPress={Copy} title="Copy message" />
        )}
        <BottomModal.ModalButton onPress={Favorite} title="Favorite message" />
      </BottomModal.ModalRoot>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    margin: 5,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 5,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  video: {
    flex: 1,
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  messageText: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  dateText: {
    fontSize: 12,
    alignSelf: "flex-end",
    color: COLORS.white,
  },
  mediaContainer: {
    justifyContent: "center",
    paddingBottom: 5,
  },
  media: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
