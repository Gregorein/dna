import { QRPopup, Screen } from "../components";
import { navigate, useStoreDispatch } from "../store";

export const FestivalPage = () => {
  const dispatch = useStoreDispatch();

	return (
		<Screen
			title="Festival"
			actions={[
				{ label: "festivals", callback: () => dispatch(navigate("/home")) },
			]}
		>
			<QRPopup />
		</Screen>
	)
}
