import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

export default function PlaceHolderComponent() {
	const theme = useTheme();
	return (
		<div
			alt="No Image"
			style={{
				height: "95%",
				// backgroundColor: theme.palette.primary.main,
				borderRadius: "16px",
				border: "0.3rem solid",
				borderColor: theme.palette.secondary.card,
				margin: "1rem",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Typography
				sx={{
					fontFamily: theme.fonts.header,
					fontWeight: "light",
					fontSize: "1.5rem",
				}}
			>
				Contenido no disponible
			</Typography>
		</div>
	);
}
