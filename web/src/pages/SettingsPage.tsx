import { Screen } from "../components";
import { Cog } from 'lucide-react'
import { navigate, useStoreDispatch } from "../store";

export const SettingsPage = () => {
  const dispatch = useStoreDispatch();

	return (
		<Screen
			title="settings"
			actions={[
				{ label: "festivals", callback: () => dispatch(navigate("/home")) },
			]}
		>
			<Cog />
		</Screen>
	)
}
