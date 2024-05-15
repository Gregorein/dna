import { useMemo, useState } from "react";
import { navigate, setUser, useStoreDispatch } from "../store";
import { Screen } from "../components";
import { login } from "../api";

import {
	TextField,
	InputAdornment,
	IconButton,
	FormControl,
	InputLabel,
	OutlinedInput,
	FormHelperText ,
} from "@mui/material"
import {
	Eye,
	EyeOff
} from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const dispatch = useStoreDispatch();

	const [showPassword, togglePassword] = useState(false)
	const toggleShowPassword = ():void => togglePassword(!showPassword)

  const actions = useMemo(
    () => [
      {
        label: "login",
        callback: async () => {
          try {
            const user = await login(email, password);
            dispatch(setUser(user));
            dispatch(navigate("/home"));
          } catch (e) {
            setError(String(e));
          }
        },
      },
			{
				label: "back",
				callback: () => dispatch(navigate("/")),
			},
    ],
    [email, password],
  );

  return (
    <Screen
      title="Login"
      content={
        <>
          <form className="form">
						<TextField
							label="Email:"
							name="email"
							type="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
					/>

					<FormControl variant="outlined">
						<InputLabel>
							Password:
						</InputLabel>
						<OutlinedInput
							type={showPassword ? 'text' : 'password'}
							name="password"
							error={!!error}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={toggleShowPassword}
										edge="end"
									>
										{showPassword ? <EyeOff /> : <Eye />}
									</IconButton>
								</InputAdornment>
							}
							label="Password:"
              onChange={(e) => setPassword(e.target.value)}
						/>
							{error && (
								<FormHelperText sx={{color: "red"}}>
									{error}
								</FormHelperText>
							)}
						</FormControl>
					</form>
				</>
      }
      actions={actions}
    />
  );
};
