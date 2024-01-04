import {
  View,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Image,
} from "react-native";
import { useRef, useState, useContext } from "react";
import { COLORS, IMAGES } from "../constants";
import { ResizeMode, Video } from "expo-av";
import { Input } from "../components/Input";
import { ChatScreenUtils } from "../utils/ChatScreen";
import Header from "../components/Header";
import { AuthContext } from "../provider/authentication";

export default function MediaScreen({ navigation, route }: any) {
  const { user } = useContext(AuthContext);

  const [message, updateMessage] = useState<string>("");

  const videoRef = useRef<Video>(null);

  const {
    media,
    type,
    typeMedia,
    message: messageBoolean,
    from,
  } = route?.params;
  const back = navigation.goBack;

  function IconLeft() {
    if (typeMedia === "video") {
      new ChatScreenUtils().sendMessage({
        message: message,
        type: typeMedia,
        video: media,
        author: user?.id as string,
        read: false,
        from: from,
      });
    } else {
      new ChatScreenUtils().sendMessage({
        message: message,
        type: typeMedia,
        image: media,
        author: user?.id as string,
        read: false,
        from: from,
      });
    }
    navigation.goBack();
  }

  return (
    <View
      style={[
        styles.container,
        Platform.OS === "ios" ? { paddingBottom: 30 } : { paddingBottom: 20 },
      ]}
    >
      <Header
        back={() => back()}
        title={type.charAt(0).toUpperCase() + type.slice(1)}
      />
      <View style={styles.mediaContainer}>
        {typeMedia === "video" ? (
          <Video
            volume={1}
            ref={videoRef}
            isLooping
            useNativeControls
            source={{ uri: media }}
            shouldPlay={true}
            style={styles.media}
            resizeMode={ResizeMode.CONTAIN}
          />
        ) : (
          <Image
            style={[
              styles.media,
              {
                aspectRatio: 4 / 3,
              },
            ]}
            source={{ uri: media }}
          />
        )}
      </View>
      {messageBoolean && (
        <Input.Root>
          <Input.Input
            value={message}
            onChangeText={updateMessage}
            placeholder="Message"
          />
          <Input.Icon onPress={IconLeft} side="Left" icon={IMAGES.send} />
        </Input.Root>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.back,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.back,
  },
  media: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
});
