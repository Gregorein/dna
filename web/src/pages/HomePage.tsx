import {useEffect, useState} from "react"

import { navigate, useStoreDispatch } from "../store";
import { Screen } from "../components";
import { useIsUserLoggedIn } from "../hooks";
import "./HomePage.css";

import {
	List,
	ListItemButton,
	ListItemIcon
} from "@mui/material"

import {Theater} from "lucide-react"

import {festivalsList, Festival} from "../api/festivalsList"


export const HomePage = () => {
  const user = useIsUserLoggedIn();
  const dispatch = useStoreDispatch();

	const [list, setList] = useState<Festival[]>([])
	useEffect(() => {
		if (!user || list.length !== 0) {
			return
		}

		const getFestivals = async () => {
			const festivals = await festivalsList(user.id)
			setList(festivals)
		}

		getFestivals().catch(console.error)
	}, [])

  if (!user) {
    return null;
  }

  const actions = [
    { label: "settings", callback: () => dispatch(navigate("/settings")) },
    { label: "logout", callback: () => dispatch(navigate("/")) },
  ];

  return (
    <Screen
      title="Home"
      content={
				<List>
					{list ? (
						list.map(({name, id}) => (
							<ListItemButton
								key={id}
								onClick={() => dispatch(navigate(`/festival`, id))}
							>
								<ListItemIcon>
									<Theater size="48" color="black" />
								</ListItemIcon>
								{name}
							</ListItemButton>
						))
					) : (
						"error"
					)}
				</List>
      }
      actions={actions}
    />
  );
};
