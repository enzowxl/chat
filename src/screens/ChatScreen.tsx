import { StyleSheet, FlatList, ImageBackground, Platform } from "react-native";
import { Input } from "../../src/components/Input/index";
import { COLORS, IMAGES } from "../../src/constants";
import { useState, useRef, useMemo, useContext, useEffect } from "react";
import { ChatScreenUtils } from "../utils/ChatScreen";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomModal } from "../components/BottomSheetModal";
import { AuthContext } from "../provider/authentication";
import HeaderChat from "../../src/components/HeaderChat";
import Messages from "../components/Messages";
import { get, onValue, ref, update } from "firebase/database";
import { db } from "../db";

export default function ChatScreen({ navigation, id }: any) {
  const { user } = useContext(AuthContext);

  const [message, updateMessage] = useState<string>("");
  const [item, updateItem] = useState<any>({});
  const [favorite, updateFavorite] = useState<any>({});
  const [messages, updateMessages] = useState<any[]>([]);
  const [typing, updateTyping] = useState<any>(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { dismissAll } = useBottomSheetModal();

  useEffect(() => {
    (() => {
      onValue(ref(db, `users/${user?.id}/chats/${id}/messages`), (snap) => {
        updateMessages([]);
        snap.forEach((requests: any) => {
          let data = {
            key: requests.key,
            ...requests.val(),
          };
          updateMessages((old: any) => [...old, data]);
        });
      });
      onValue(ref(db, `users/${id}`), (snap) => {
        updateItem({});
        updateItem({ ...snap.val() });
      });
      onValue(ref(db, `users/${user?.id}/friends/${id}`), (snap) => {
        updateFavorite(false);
        updateFavorite(snap.val()?.favorite);
      });
      onValue(ref(db, `users/${user?.id}/friends/${id}`), (snap) => {
        updateTyping(false);
        updateTyping(snap.val()?.typing);
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const snap = await get(ref(db, `users/${id}/chats/${user?.id}/messages`));

      snap.forEach((message) => {
        const messageId = message.key;
        const messageData = message.val();
        if (!messageData.read && messageData?.senderId !== user?.id) {
          const messageRef = ref(
            db,
            `users/${id}/chats/${user?.id}/messages/${messageId}`
          );
          update(messageRef, { read: true });
        }
      });
    })();
  }, [messages]);

  function Image(type: string) {
    new ChatScreenUtils().chooseImage(type, navigation, item?.id).then(() => {
      dismissAll();
    });
  }

  function IconLeft() {
    new ChatScreenUtils().sendMessage({
      message,
      type: "text",
      author: user?.id as string,
      read: false,
      from: item?.id,
    });
    updateMessage("");
  }

  function IconRight() {
    bottomSheetModalRef?.current?.present();
  }

  function onFocusInput() {
    update(ref(db, `users/${item?.id}/friends/${user?.id}`), {
      typing: true,
    });
  }

  function onBlurInput() {
    update(ref(db, `users/${item?.id}/friends/${user?.id}`), {
      typing: false,
    });
  }

  return (
    <ImageBackground
      imageStyle={styles.img}
      source={IMAGES.back_chat}
      style={[
        styles.container,
        Platform.OS === "ios" ? { paddingBottom: 30 } : { paddingBottom: 20 },
      ]}
    >
      <HeaderChat
        navigation={navigation}
        name={item?.name}
        lastName={item?.lastName}
        status={item?.status}
        typing={typing}
        photo={item?.photo}
        id={id}
        favorite={favorite}
      />
      <FlatList
        inverted
        data={messages.slice().reverse()}
        keyExtractor={(item) => item?.hour.toString()}
        renderItem={(props) => (
          <Messages
            data={messages}
            id={item?.id}
            navigation={navigation}
            {...props}
          />
        )}
      />
      <Input.Root>
        <Input.Icon onPress={IconRight} side="Right" icon={IMAGES.photo} />
        <Input.Input
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          multiline
          value={message}
          onChangeText={updateMessage}
          placeholder="Message"
        />
        {message.length > 0 && (
          <Input.Icon onPress={IconLeft} side="Left" icon={IMAGES.send} />
        )}
      </Input.Root>
      <BottomModal.ModalRoot
        ref={bottomSheetModalRef}
        index={0}
        points={["20%"]}
      >
        <BottomModal.ModalButton
          onPress={() => Image("camera")}
          title="Camera"
        />
        <BottomModal.ModalButton
          onPress={() => Image("gallery")}
          title="Gallery"
        />
      </BottomModal.ModalRoot>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.back,
  },
  img: {
    opacity: 1,
  },
});
