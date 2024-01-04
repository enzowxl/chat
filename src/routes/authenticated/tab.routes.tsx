import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Platform, StyleSheet } from "react-native";
import { COLORS, IMAGES } from "../../constants";
import { SCREENS_AUTH, SCREENS_STACK } from "../../constants/screens";
import AddScreen from "../../screens/AddScreen";
import ProfileScreen from "../../screens/Profile";
import ChatsScreen from "../../screens/ChatsScreen";
import StackAdd from "../../screens/StackAdd";
import TabButton from "../../components/TabButton";

export default function TabRoutes() {
  const Tab = createBottomTabNavigator();

  const Tabarr = [
    { route: SCREENS_AUTH.CHATS, component: ChatsScreen, image: IMAGES.chat },
    {
      route: SCREENS_STACK.STACK_ADD,
      component: StackAdd,
      image: IMAGES.search,
    },
    {
      route: SCREENS_STACK.STACK_PROFILE,
      component: ProfileScreen,
      image: IMAGES.profile,
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tab,
      }}
    >
      {Tabarr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item?.route}
          component={item?.component}
          options={{
            tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: COLORS.primary,
    borderTopWidth: 0,
    elevation: 0,
  },
});
