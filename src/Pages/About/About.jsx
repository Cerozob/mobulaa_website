import React from "react";
import { useTheme } from "@mui/material/styles";

export default function About() {
	const theme = useTheme();
	return (
		<div>
			<h1 style={{ color: theme.palette.secondary.main, padding: "2rem" }}>
				Nosotros
			</h1>
		</div>
	);
}
