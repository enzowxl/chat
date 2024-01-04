import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SCREENS_AUTH, SCREENS_STACK_PRIMARY } from "../../constants/screens";
import TabRoutes from "./tab.routes";
import ChatScreen from "../../screens/ChatScreen";
import { Platform, View } from "react-native";
import { COLORS } from "../../constants";
import StackChat from "../../screens/StackChat";

export default function Authenticated() {
  const Stack = createStackNavigator();

  const Stackarr = [
    {
      route: SCREENS_STACK_PRIMARY.TAB,
      component: TabRoutes,
    },
    {
      route: SCREENS_STACK_PRIMARY.CHAT,
      component: StackChat,
    },
  ];

  return (
    <View
      style={[
        { flex: 1, backgroundColor: COLORS.back },
        Platform.OS === "ios" ? { paddingTop: 30 } : null,
      ]}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          transitionSpec: {
            open: { animation: "timing", config: { duration: 500 } },
            close: { animation: "timing", config: { duration: 500 } },
          },
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
        }}
      >
        {Stackarr.map((item, index) => (
          <Stack.Screen
            key={index}
            name={item?.route}
            component={item?.component}
          />
        ))}
      </Stack.Navigator>
    </View>
  );
}
