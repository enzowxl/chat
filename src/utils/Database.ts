import { ToastAndroid, Platform, Alert } from "react-native";
import { SignInPropsType, SignUpPropsType } from "../types/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, storage } from "../db";
import {
  getDownloadURL,
  ref as refStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { onValue, ref, set } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class DatabaseUtils {
  validateUser() {
    const validateSignUp = ({
      name,
      lastName,
      email,
      password,
      cpassword,
      photo,
    }: SignUpPropsType) => {
      let errorMessage = "";
      switch (true) {
        case name.length === 0:
          errorMessage = "Name is required";
          break;
        case lastName.length === 0:
          errorMessage = "Last name is required";
          break;
        case email.length === 0:
          errorMessage = "Email is required";
          break;
        case password.length === 0:
          errorMessage = "Password is required";
          break;
        case cpassword.length === 0:
          errorMessage = "Confirm password is required";
          break;
        case password.length <= 5:
          errorMessage = "Password must be at least 6 characters long";
          break;
        case password !== cpassword:
          errorMessage = "Passwords do not match";
          break;
        default:
          break;
      }
      if (errorMessage) {
        Platform.OS === "ios"
          ? Alert.alert("Attention", errorMessage)
          : ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        return false;
      }
      return true;
    };

    const validateSignIn = ({ email, password }: SignInPropsType) => {
      let errorMessage = "";
      switch (true) {
        case email.length === 0:
          errorMessage = "Email is required";
          break;
        case password.length === 0:
          errorMessage = "Password is required";
          break;
        default:
          break;
      }
      if (errorMessage) {
        Platform.OS === "ios"
          ? Alert.alert("Attention", errorMessage)
          : ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        return false;
      }
      return true;
    };

    return {
      validateSignIn,
      validateSignUp,
    };
  }

  async loadingImage(photo: any, uid: string) {
    try {
      const blobImage = (await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = () => {
          reject(new TypeError("Failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", photo, true);
        xhr.send(null);
      })) as any;

      const metadata = {
        contentType: "image/jpeg",
      };

      const reference = refStorage(storage, `users/` + uid);
      const uploadTask = uploadBytesResumable(reference, blobImage, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              //console.log("Upload is paused");
              break;
            case "running":
              //("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        }
      );

      await uploadTask;

      const downloadURL = await getDownloadURL(reference);
      return downloadURL;
    } catch (err) {
      console.error(err);
    }
  }

  createUser({
    name,
    lastName,
    email,
    password,
    cpassword,
    photo,
    resetAndNavigate,
  }: SignUpPropsType) {
    const { validateSignUp } = this.validateUser();
    const isValid = validateSignUp({
      name,
      lastName,
      email,
      password,
      cpassword,
      photo,
    });
    if (!isValid) return;
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          let photoDownload = null;
          if (photo) {
            photoDownload = await this.loadingImage(photo, res.user.uid);
          }
          set(ref(db, `users/` + res.user.uid), {
            id: res.user.uid,
            name: name,
            lastName: lastName,
            email: email,
            photo: photoDownload || false,
            status: false,
          });
          resetAndNavigate();
        })
        .catch((err) => {
          let errorMessage = "";
          switch (err.code) {
            case "auth/email-alredy-in-use":
              errorMessage = "Email adress in use";
              break;
            case "auth/invalid-email":
              errorMessage = "Email adress invalid";
            default:
              break;
          }
          if (errorMessage) {
            Platform.OS === "ios"
              ? Alert.alert("Attention", errorMessage)
              : ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
            return;
          }
        });
    } catch (err) {
      console.error(err);
    }
  }

  async loginUser({ email, password }: SignInPropsType) {
    const { validateSignIn } = this.validateUser();
    const isValid = validateSignIn({ email, password });
    if (!isValid) return;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return new Promise((resolve, reject) => {
        onValue(
          ref(db, `users/` + res.user.uid),
          async (response) => {
            await AsyncStorage.setItem("@email", email);
            await AsyncStorage.setItem("@password", password);
            resolve(response.val());
          },
          (err) => {
            reject(err);
          }
        );
      });
    } catch (err: any) {
      let errorMessage = "";
      switch (err.code) {
        case "auth/invalid-email":
          errorMessage = "Email adress invalid";
        case "auth/wrong-password":
          errorMessage = "Email or password incorrect";
          break;
        case "auth/user-not-found":
          errorMessage = "Email or password incorrect";
        default:
          break;
      }
      if (errorMessage) {
        Platform.OS === "ios"
          ? Alert.alert("Attention", errorMessage)
          : ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        return;
      }
    }
  }
}
