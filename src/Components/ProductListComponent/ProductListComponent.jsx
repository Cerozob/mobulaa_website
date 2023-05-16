import React from "react";
import { useTheme } from "@mui/material/styles";
import { Pagination, Typography } from "@mui/material";

export default function ProductListComponent({ items }) {
	const theme = useTheme();

	const [page, setPage] = React.useState(1);

	const handleChange = (event, value) => {
		setPage(value);
	};

	return (
		<article
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Typography
				variant="h1"
				style={{
					fontFamily: theme.fonts.logo,
					color: theme.palette.secondary.main,
					fontSize: "2rem",
					textAlign: "center",
				}}
			>
				Página {page}
			</Typography>
			<Pagination
				count={10}
				page={page}
				onChange={handleChange}
				showFirstButton
				showLastButton
			/>
		</article>
	);
}
