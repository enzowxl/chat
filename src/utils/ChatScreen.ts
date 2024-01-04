import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { SCREENS_AUTH } from "../constants/screens";
import { push, ref, set, update } from "firebase/database";
import { db, storage } from "../db";
import {
  uploadBytesResumable,
  ref as refStorage,
  getDownloadURL,
} from "firebase/storage";

export interface SendMessagePropsTypes {
  message?: string;
  type: string;
  author: string;
  read: boolean;
  from: string;
  image?: string;
  video?: string;
}

export class ChatScreenUtils {
  async uploadImage(uri: string, refMedia: any, type: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch(uri)
        .then((response) => response.blob())
        .then((blob) => {
          const options =
            type === "image" ? { type: "image/jpeg" } : { type: "video/mp4" };

          const mediaBlob = new Blob([blob], options);

          const storageRef = refStorage(storage, refMedia);
          const uploadTask = uploadBytesResumable(storageRef, mediaBlob);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (err) => {
              console.error(err);
              reject(err);
            },
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(url);
            }
          );
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  async sendMessage({
    message,
    type,
    author,
    read,
    image,
    video,
    from,
  }: SendMessagePropsTypes) {
    const hour = new Date().getTime();
    const ids = [author, from].sort() as any;
    const idsRef = `${ids[0]}_${ids[1]}` as any;

    try {
      let imageUri = null as any;
      let videoUri = null as any;

      if (type === "image" && image) {
        imageUri = await this.uploadImage(
          image,
          `users/medias/${idsRef}_${hour}`,
          "image"
        );
      } else if (type === "video" && video) {
        videoUri = await this.uploadImage(
          video,
          `users/medias/${idsRef}_${hour}`,
          "video"
        );
      }

      const messageType = () => {
        if (type === "text") {
          const messageOptions = {
            message: message,
            type: type,
            author: author,
            read: read,
            hour: hour,
          };
          return messageOptions;
        } else if (type === "image") {
          const messageImageOptions = {
            message: message ? message : null,
            image: imageUri,
            type: type,
            author: author,
            read: read,
            hour: hour,
          };
          return messageImageOptions;
        } else if (type === "video") {
          const messageVideoOptions = {
            message: message ? message : null,
            video: videoUri,
            type: type,
            author: author,
            read: read,
            hour: hour,
          };
          return messageVideoOptions;
        }
      };

      const lastMessage = {
        message: message
          ? message
          : messageType()?.type === "video"
          ? "📷 Video"
          : messageType()?.type === "image"
          ? "📷 Image"
          : null,
        hour: hour,
        read: false,
        author: author,
        unreadMessages: 0,
      };

      const key = push(ref(db, `users/${author}/chats/${from}/messages`), messageType()).key
      set(ref(db, `users/${from}/chats/${author}/messages/${key}`), messageType());
      set(ref(db, `users/${author}/friends/${from}/lastMessage`), lastMessage);
      set(ref(db, `users/${from}/friends/${author}/lastMessage`), lastMessage);
    } catch (err) {
      console.error(err);
    }
  }

  async chooseImage(type: string, navigation: any, from: string) {
    const nav = navigation.navigate;
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images, //All
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        nav(SCREENS_AUTH.MEDIA_CHAT, {
          media: result.assets[0].uri,
          type,
          typeMedia: result.assets[0].type,
          message: true,
          from,
        });
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images, //All
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        nav(SCREENS_AUTH.MEDIA_CHAT, {
          media: result.assets[0].uri,
          type,
          typeMedia: result.assets[0].type,
          message: true,
          from,
        });
      }
    }
  }
}
