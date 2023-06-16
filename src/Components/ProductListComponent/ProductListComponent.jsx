import React from "react";
import { useTheme } from "@mui/material/styles";
import { Grid, Pagination, Typography } from "@mui/material";
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

	const [page, setPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(1);
	const [currentItems, setCurrentItems] = React.useState(items);

	const handleChange = (event, value) => {
		setPage(value);
	};

	React.useEffect(() => {
		setTotalPages(Math.ceil(totalItems / itemsPerPage));
	}, [totalItems, itemsPerPage]);

	React.useEffect(() => {
		if (type === "Featured") {
			findFeaturedProducts(page).then((response) => {
				// console.log("recomendados", response);
				setCurrentItems(response.results);
			});
			// si es search, no se hace nada porque ya se hizo en el search
		} else if (type !== "Search") {
			findProductsByType(type, page).then((response) => {
				// console.log(type, "in productlistcomponent", response);
				setCurrentItems(response.results);
			});
		}
	}, [page, type]);

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
						spacing={1}
						sx={{
							width: "100%",
							minHeight: "70vh",
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-around",
							alignItems: "stretch",
						}}
					>
						{currentItems.map((item) => (
							<ProductCardComponent product={item} />
						))}
					</Grid>
					<Pagination
						count={totalPages}
						page={page}
						onChange={handleChange}
						showFirstButton
						showLastButton
						sx={{
							display: "flex",
							justifyContent: "center",
							marginTop: "1rem",
							flexDirection: "row",
						}}
					/>
				</div>
			) : (
				<Typography
					variant="p"
					style={{
						fontFamily: theme.fonts.body,
						color: theme.palette.secondary.main,
						fontSize: "1rem",
						textAlign: "center",
					}}
				>
					En este momento no hay ningún {type} disponible
				</Typography>
			)}
		</article>
	);
}
