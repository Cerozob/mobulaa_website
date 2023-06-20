import React from "react";
import { useTheme } from "@mui/material/styles";
import { Grid, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import {
	findProductsByType,
	findSuggestedProducts as findFeaturedProducts,
} from "../../prismic";
import ProductCardComponent from "../ProductCardComponent/ProductCardComponent";

export default function ProductListComponent({
	items = [],
	type = "Smartphone",
	totalItems = 0,
	pagination = true,
	itemsPerPage = 3, // la diseñadora dijo 3
}) {
	const theme = useTheme();

	const [currentItems, setCurrentItems] = React.useState(items);

	React.useEffect(() => {
		if (type === "Featured") {
			findFeaturedProducts(1).then((response) => {
				// console.log("recomendados", response);
				setCurrentItems(response.results);
			});
			// si es search, no se hace nada porque ya se hizo en el search
		} else if (type !== "Search") {
			findProductsByType(type, 1).then((response) => {
				// console.log(type, "in productlistcomponent", response);
				setCurrentItems(response.results);
			});
		}
	}, [type]);

	return (
		<article
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{items.length > 0 && pagination ? (
				<div
					style={{
						width: "95%",
					}}
				>
					<Grid
						container
						xs={12}
						spacing={0}
						sx={{
							width: "100%",
							minHeight: "70vh",
							display: "flex",
							flexDirection: "row",
						}}
					>
						{currentItems.map((item) => (
							<ProductCardComponent product={item} />
						))}
					</Grid>
					<Link to={`/productos/${type.toLowerCase()}s`}>
						<Button
							variant="contained"
							style={{
								backgroundColor: theme.palette.primary.main,
								color: theme.palette.secondary.main,
								fontFamily: theme.fonts.header,
								fontWeight: "light",
								fontSize: "1.5rem",
								margin: "1rem",
							}}
						>
							Ver más
						</Button>
					</Link>
				</div>
			) : (
				<Typography
					variant="h6"
					fontFamily={theme.fonts.body}
					color={theme.palette.secondary.main}
					textAlign={"start"}
				>
					En este momento no hay ningún {type} disponible
				</Typography>
			)}
		</article>
	);
}
