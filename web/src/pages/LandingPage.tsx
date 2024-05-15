import { navigate, useStoreDispatch } from "../store";
import { Screen } from "../components";

import {Theater} from "lucide-react"

export const LandingPage = () => {
  const dispatch = useStoreDispatch();

  const actions = [
    { label: "login", callback: () => dispatch(navigate("/login")) },
    {
      label: "register",
      callback: () => dispatch(navigate("/register")),
    },
  ];

  return (
    <Screen
      title="Fantastic Festivals Web App!"
      actions={actions}
			>
			<Theater size={256} />
		</Screen>
  );
};
