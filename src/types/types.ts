import { ReactNode } from "react";

export interface InputPropsType {
  placeholder: string;
  value: string;
  minHeight?: number;
  onChangeText: (value: string) => void;
  multiline?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  securePass?: boolean;
}

export interface InputIconPropsType {
  icon: any;
  side: "Left" | "Right";
  onPress: () => void;
}

export interface InputRootPropsType {
  children: ReactNode;
}

export interface HeaderChatPropsType {
  name: string;
  lastName: string;
  status: boolean;
  photo: string;
  id: number;
  navigation: any;
  typing: boolean;
  favorite?: boolean;
}

export interface HeaderPropsType {
  title: string;
  status?: any;
  icon?: any;
  back?: boolean | any;
  navigation?: any;
}

export interface PhotoPropsType {
  favorite?: boolean;
  photo: string;
  status?: boolean;
  size: number;
  admin?: any;
}

export interface MiniButtonPropsType {
  icon: any;
  onPress: () => void;
  isFriend?: boolean;
}

export interface ProfileItemsPropsType {
  label: string;
  title: string;
  icon?: any;
  onPress?: () => void;
}

export interface ButtonInitialPropsTypes {
  back?: boolean;
  label: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
}

export interface UserPropsType {
  id: string;
  name: string;
  lastName: string;
  email: string;
  photo: string | any;
}

export interface ProviderPropsType {
  children: ReactNode;
}

export interface ModalSwitchPropsType {
  title: string;
  state: boolean;
  onPress: () => void;
}

export interface ModalButtonPropsType {
  title: string;
  onPress: () => void;
}

export interface SignUpPropsType {
  name: string;
  lastName: string;
  email: string;
  password: string;
  cpassword: string;
  photo: string | null;
  resetAndNavigate?: any;
}

export interface SignInPropsType {
  email: string;
  password: string;
}
