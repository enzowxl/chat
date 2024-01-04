import { StyleSheet, View, FlatList } from "react-native";
import { Input } from "../../src/components/Input/index";
import { COLORS, IMAGES } from "../../src/constants";
import { useContext, useEffect, useState } from "react";
import { ChatsScreenUtils } from "../utils/ChatsScreen";
import { onValue, ref } from "firebase/database";
import { db } from "../db";
import { AuthContext } from "../provider/authentication";
import Header from "../components/Header";
import Chats from "../components/Chats";

export default function ChatsScreen({ navigation }: any) {
  const [search, updateSearch] = useState<string>("");
  const [filter, updateFilter] = useState<boolean>(false);
  const [friends, updateFriends] = useState<any[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    (() => {
      onValue(ref(db, `users/${user?.id}/friends`), (snap) => {
        updateFriends([]);
        snap.forEach((requests: any) => {
          let data = {
            key: requests.key,
            lastMessage: requests.val().lastMessage,
            ...requests.val(),
          };
          updateFriends((old: any) => [...old, data]);
        });
      });
    })();
  }, []);

  const { filterChats, filterSearch, filterButton } =
    new ChatsScreenUtils().filters(friends, search);

  function IconLeft() {
    updateFilter(!filter);
  }

  return (
    <View style={styles.container}>
      <Header title="Your chats" />
      <View style={styles.margin}>
        <Input.Root>
          <Input.Input
            value={search}
            onChangeText={updateSearch}
            minHeight={60}
            placeholder="Search chat"
          />
          <Input.Icon side="Left" icon={IMAGES.filter} onPress={IconLeft} />
        </Input.Root>
      </View>
      {filter ? (
        <FlatList
          data={filterButton}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={(props) => <Chats navigation={navigation} {...props} />}
        />
      ) : search.length > 0 ? (
        <FlatList
          data={filterSearch}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={(props) => <Chats navigation={navigation} {...props} />}
        />
      ) : (
        <FlatList
          data={filterChats}
          keyExtractor={(item) => item?.id}
          renderItem={(props) => <Chats navigation={navigation} {...props} />}
        />
      )}
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
});
