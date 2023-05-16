import React from "react";
import { useTheme } from "@mui/material/styles";

export default function Contacto() {
	const theme = useTheme();
	return (
		<div>
			<h1 style={{ color: theme.palette.secondary.main, padding: "2rem" }}>
				Contacto
			</h1>
		</div>
	);
}
