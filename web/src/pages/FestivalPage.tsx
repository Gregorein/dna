import { QRPopup, Screen } from "../components";
import { navigate, useStoreDispatch, useStoreSelector } from "../store";

export const FestivalPage = () => {
  const dispatch = useStoreDispatch();
	const activeFestival = useStoreSelector((store) => store.router.activeFestival);

	return (
		<Screen
			title={`Festival: ${activeFestival}`}
			actions={[
				{ label: "festivals", callback: () => dispatch(navigate("/home")) },
			]}
		>
			<QRPopup />
		</Screen>
	)
}
