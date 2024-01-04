import { useContext } from "react";
import { AuthContext } from "../provider/authentication";
import Unauthenticated from "./unauthenticated/stack.routes";
import Authenticated from "./authenticated/stack.routes";

export default function Routes() {
  const { logged, load } = useContext(AuthContext);

  //if (load) return; //<Splash />;

  return logged ? <Authenticated /> : <Unauthenticated />;
}
