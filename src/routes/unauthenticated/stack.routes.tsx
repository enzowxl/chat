import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SCREENS_NO_AUTH } from "../../constants";
import InitialScreen from "../../screens/InitialScreen";
import SignInScreen from "../../screens/SigninScreen";
import SignUpScreen from "../../screens/SignupScreen";

export default function Unauthenticated() {
  const Stack = createStackNavigator();

  const Stackarr = [
    {
      route: SCREENS_NO_AUTH.INITIAL,
      component: InitialScreen,
    },
    {
      route: SCREENS_NO_AUTH.SIGNIN,
      component: SignInScreen,
    },
    {
      route: SCREENS_NO_AUTH.SIGNUP,
      component: SignUpScreen,
    },
  ];

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
      {Stackarr.map((item, index) => (
        <Stack.Screen
          key={index}
          name={item?.route}
          component={item?.component}
        />
      ))}
    </Stack.Navigator>
  );
}
