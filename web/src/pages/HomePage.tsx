import { navigate, useStoreDispatch } from "../store";
import { Screen } from "../components";
import { useIsUserLoggedIn } from "../hooks";
import "./HomePage.css";

import QRPopup from "../components/QRPopup"

export const HomePage = () => {
  const user = useIsUserLoggedIn();
  const dispatch = useStoreDispatch();

  if (!user) {
    return null;
  }

  const actions = [
    { label: "top-up wallet", callback: () => dispatch(navigate("/top-up")) },
    { label: "logout", callback: () => dispatch(navigate("/")) },
  ];


  return (
    <Screen
      title="Home"
      content={
        <div>
          <QRPopup />	
        </div>
      }
      actions={actions}
    />
  );
};
