import { LogBox } from "react-native";
import App from "./src";
import "react-native-gesture-handler";

export default function ChatUnify() {
  LogBox.ignoreAllLogs();
  return <App />;
}
