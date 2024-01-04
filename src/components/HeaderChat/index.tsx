import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { COLORS, IMAGES } from "../../constants";
import { HeaderChatPropsType } from "../../types/types";
import { BottomModal } from "../BottomSheetModal";
import { useRef, useState } from "react";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import Photo from "../Photo";

export default function HeaderChat({
  name,
  lastName,
  status,
  photo,
  id,
  navigation,
  typing,
  favorite,
}: HeaderChatPropsType) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [switchBlock, updateSwitchBlock] = useState<boolean>(false);

  const { dismiss, dismissAll } = useBottomSheetModal();

  function Profile() {}

  function Options() {
    bottomSheetModalRef?.current?.present();
  }

  function Back() {
    dismissAll();
    const nav = navigation.goBack;
    nav();
  }

  function Denounce() {}

  function Block() {
    updateSwitchBlock(!switchBlock);
  }

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={Back}>
          <Image style={styles.icon} source={IMAGES.back} />
        </TouchableOpacity>
        <TouchableOpacity onPress={Profile} style={styles.profileContainer}>
          <Photo favorite={favorite} size={50} photo={photo} status={status} />
          <View>
            <Text style={styles.name}>
              {name}
              {lastName ? ` ${lastName}` : null}
            </Text>
            <Text style={styles.status}>
              {typing ? "Typing..." : status ? "Online" : "Offline"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={Options}>
        <Image style={styles.icon} source={IMAGES.dots} />
      </TouchableOpacity>
      <BottomModal.ModalRoot
        ref={bottomSheetModalRef}
        index={0}
        points={["20%"]}
      >
        <BottomModal.ModalSwitch
          onPress={Block}
          state={switchBlock}
          title={"Block"}
        />
        <BottomModal.ModalButton onPress={Denounce} title={"Denounce"} />
      </BottomModal.ModalRoot>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
  },
  photo: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 100,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
  },
  name: {
    fontSize: 15,
    color: COLORS.white,
    marginLeft: 10,
    fontFamily: "Poppins_500Medium",
  },
  status: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 10,
    fontFamily: "Poppins_500Medium",
  },
});
