import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SCREENS_AUTH } from "../../constants/screens";
import ChatScreen from "../ChatScreen";
import MediaScreen from "../MediaScreen";

export default function StackChat({ route }: any) {
  const Stack = createStackNavigator();

  const item = route.params;

  return (
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
      <Stack.Screen name={SCREENS_AUTH.CHAT}>
        {(props) => <ChatScreen id={item?.id} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
        name={SCREENS_AUTH.MEDIA_CHAT}
      >
        {(props) => <MediaScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
