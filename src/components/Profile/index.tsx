import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  View,
} from "react-native";
import { COLORS } from "../../constants";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import Photo from "../Photo";
import { BottomModal } from "../BottomSheetModal";

export default function Profile(props: any) {
  const { width } = useWindowDimensions();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  function Edit() {
    bottomSheetModalRef?.current?.present();
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
      <TouchableOpacity onPress={Edit}>
        <Text style={[styles.name, { color: COLORS.gray }]}>Edit</Text>
      </TouchableOpacity>
      <BottomModal.ModalRoot
        index={0}
        points={["50%"]}
        ref={bottomSheetModalRef}
      >
        <Text>aaaaaaa</Text>
      </BottomModal.ModalRoot>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: COLORS.gray_e,
    marginBottom: 30,
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
