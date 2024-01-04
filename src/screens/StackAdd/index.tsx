import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import AddScreen from "../AddScreen";
import RequestsScreen from "../Requests";
import { SCREENS_AUTH } from "../../constants/screens";

export default function StackAdd() {
  const Stack = createStackNavigator();

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
      <Stack.Screen name={SCREENS_AUTH.ADD} component={AddScreen} />
      <Stack.Screen name={SCREENS_AUTH.REQUESTS} component={RequestsScreen} />
    </Stack.Navigator>
  );
}
