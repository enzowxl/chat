import { StyleSheet, View, FlatList } from "react-native";
import { Input } from "../../src/components/Input/index";
import { COLORS, IMAGES } from "../../src/constants";
import { useState, useEffect, useContext } from "react";
import { SCREENS_AUTH } from "../constants/screens";
import { onValue, ref } from "firebase/database";
import { db } from "../db";
import Header from "../components/Header";
import AddFriend from "../components/AddFriend";
import * as Clipboard from "expo-clipboard";
import { AuthContext } from "../provider/authentication";

export default function AddScreen({ navigation }: any) {
  const [search, updateSearch] = useState<string>("");
  const [friend, updateFriend] = useState<any[]>([]);
  const [request, updateResquest] = useState<number>(0);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    (() => {
      onValue(ref(db, `users`), (snap) => {
        updateFriend([]);
        snap.forEach((friend: any) => {
          if (friend.val()?.id === search) {
            let data = {
              key: friend?.key,
              ...friend.val(),
            };
            updateFriend((old: any) => [...old, data]);
          }
        });
      });

      onValue(ref(db, `users/${user?.id}/myRequests`), (snap) => {
        updateResquest(0);
        snap.forEach((requests: any) => {
          updateResquest([requests].length);
        });
      });
    })();
  }, [search]);

  function navigateRequest() {
    const nav = navigation.navigate;
    nav(SCREENS_AUTH.REQUESTS);
  }

  async function IconLeft() {
    const text = await Clipboard.getStringAsync();
    updateSearch(text);
  }

  return (
    <View style={styles.container}>
      <Header
        icon={{
          icon: IMAGES.invite,
          notification: request > 0 ? true : false,
          onPress: () => navigateRequest(),
        }}
        title="Add friend"
      />
      <View style={styles.margin}>
        <Input.Root>
          <Input.Input
            value={search}
            onChangeText={updateSearch}
            minHeight={60}
            placeholder="Search friend for id"
          />
          <Input.Icon onPress={IconLeft} side="Left" icon={IMAGES.paste} />
        </Input.Root>
      </View>
      <View style={styles.align}>
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={friend}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={(props) => (
            <AddFriend navigation={navigation} {...props} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.back,
  },
  margin: {
    paddingBottom: 15,
  },
  align: {
    alignItems: "center",
  },
});
