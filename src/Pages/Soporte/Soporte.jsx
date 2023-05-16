import React from "react";
import { useTheme } from "@mui/material/styles";

export default function Soporte() {
	const theme = useTheme();
	return (
		<div>
			<h1 style={{ color: theme.palette.secondary.main, padding: "2rem" }}>
				Soporte
			</h1>
		</div>
	);
}
