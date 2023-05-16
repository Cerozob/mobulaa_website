import React from "react";
import { useContext } from "react";
import { ColorModeContext } from "../../App";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";

export default function DarkModeToggleComponent() {
	const colorMode = useContext(ColorModeContext);
	const theme = useTheme();

	return (
		<IconButton
			sx={{ height: "3rem", width: "3rem" }}
			onClick={() => {
				colorMode.toggleColorMode();
			}}
			color="secondary.main"
		>
			{colorMode.colorMode === "light" ? (
				<Brightness7Icon style={{ fill: theme.palette.secondary.main }} />
			) : (
				<Brightness4Icon style={{ fill: theme.palette.secondary.main }} />
			)}
		</IconButton>
	);
}
