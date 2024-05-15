import { ReactNode } from "react";

import {
	Typography,
	Box,
	ButtonGroup,
	Button
} from "@mui/material"

interface Action {
  label: string;
  callback: () => void;
}

interface ScreenProps {
  title: string;
  content?: ReactNode;
	children?: ReactNode
  actions: Array<Action>;
}

export const Screen = (props: ScreenProps) => {
  return (
    <Box sx={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			height: "100%"
		}}>
			<Typography
				component="h1"
				variant="h2"
				textAlign="center"
			>
				{props.title}
				</Typography>
      <Box sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				flex: 1,
				padding: 3
			}}>
        {props.content || props.children}
      </Box>
      <ButtonGroup
				orientation="vertical"
				size="large"
			>
        {props.actions.map((action, i) => {
          return (
            <Button
              key={action.label}
              onClick={action.callback}
							variant={i === 0 ? "contained" : "outlined"}
            >
              {action.label.toUpperCase()}
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
};
