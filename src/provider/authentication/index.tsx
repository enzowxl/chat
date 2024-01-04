import { createContext, useEffect, useState } from "react";
import {
  ProviderPropsType,
  SignInPropsType,
  SignUpPropsType,
  UserPropsType,
} from "../../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DatabaseUtils } from "../../utils/Database";
import { onDisconnect, ref, update } from "firebase/database";
import { db } from "../../db";

export const AuthContext = createContext<{
  user: UserPropsType | null;
  load: boolean;
  logged: boolean;
  signUp: any;
  signIn: any;
  signOut: any;
}>({
  user: null,
  load: true,
  logged: false,
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
});

export default function Provider({ children }: ProviderPropsType) {
  const [user, updateUser] = useState<UserPropsType | null>(null);
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem("@email");
      const password = await AsyncStorage.getItem("@password");
      if (email && password) {
        return signIn({ email: email, password: password });
      }
    })();
  }, []);

  useEffect(() => {
    if (user) {
      const userRef = ref(db, `users/${user?.id}`);
      onDisconnect(userRef).update({ status: false });
      update(userRef, { status: true });
    }
  }, [user]);

  function signUp({
    name,
    lastName,
    email,
    password,
    cpassword,
    photo,
    resetAndNavigate,
  }: SignUpPropsType) {
    new DatabaseUtils().createUser({
      name,
      lastName,
      email,
      password,
      cpassword,
      photo,
      resetAndNavigate,
    });
  }

  async function signIn({ email, password }: SignInPropsType) {
    const res = (await new DatabaseUtils().loginUser({
      email,
      password,
    })) as UserPropsType;
    updateUser(res);
  }

  function signOut() {}

  return (
    <AuthContext.Provider
      value={{
        user,
        load,
        logged: !!user,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
