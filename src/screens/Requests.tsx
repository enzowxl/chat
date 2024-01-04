import { StyleSheet, View, FlatList } from "react-native";
import { COLORS, IMAGES } from "../../src/constants";
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Requests from "../components/Requests";
import { onValue, ref } from "firebase/database";
import { db } from "../db";
import { AuthContext } from "../provider/authentication";

export default function RequestsScreen({ navigation }: any) {
  const [requests, updateRequests] = useState<any[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    (() => {
      onValue(ref(db, `users/${user?.id}/myRequests`), (snap) => {
        updateRequests([]);
        snap.forEach((requests: any) => {
          let data = {
            key: requests.key,
            ...requests.val(),
          };
          updateRequests((old: any) => [...old, data]);
        });
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} back title="Requests" />
      <View style={styles.cont}>
        <FlatList
          data={requests}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={(props) => <Requests {...props} />}
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
  cont: {
    alignItems: "center",
  },
});
