import React from "react";
import { useTheme } from "@mui/material/styles";
import { Grid, Button, Typography, Pagination } from "@mui/material";
import { Link } from "react-router-dom";

import {
	findProductsByType,
	findSuggestedProducts as findFeaturedProducts,
} from "../../prismic";
import ProductCardComponent from "../ProductCardComponent/ProductCardComponent";

export default function TopnProductsComponent({
	items = [],
	type = "Smartphone",
	totalItems = 0,
	pagination = true,
	n = 3,
	itemsPerRow = 3, // la diseñadora dijo 3
}) {
	const theme = useTheme();

	const [page, setPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(1);
	const [currentItems, setCurrentItems] = React.useState(items);

	const handleChange = (event, value) => {
		setPage(value);
	};

	React.useEffect(() => {
		setTotalPages(Math.ceil(totalItems / n));
	}, [totalItems, n]);

	React.useEffect(() => {
		if (type === "Featured") {
			findFeaturedProducts(page, n).then((response) => {
				// console.log("recomendados", response);
				setCurrentItems(response.results);
			});
			// si es search, no se hace nada porque ya se hizo en el search
		} else if (type !== "Search") {
			console.log("type", type);
			console.log("page", page);
			console.log("n", n);
			findProductsByType(type, page, n).then((response) => {
				// console.log(type, "in productlistcomponent", response);
				setCurrentItems(response.results);
			});
		}
	}, [n, page, type]);

	return (
		<article
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{items.length > 0 ? (
				<div
					style={{
						width: "95%",
					}}
				>
					<Grid
						container
						spacing={0}
						sx={{
							width: "100%",
							minHeight: "70vh",
							display: "flex",
							flexDirection: "row",
						}}
					>
						{currentItems.map((item) => (
							<ProductCardComponent product={item} itemsPerRow={itemsPerRow} />
						))}
					</Grid>

					{pagination ? (
						<Pagination
							count={totalPages}
							page={page}
							onChange={handleChange}
							showFirstButton
							showLastButton
							sx={{
								display: totalPages > 1 ? "flex" : "none",
								justifyContent: "center",
								marginTop: "1rem",
								flexDirection: "row",
							}}
						/>
					) : (
						<Link to={`/productos/${type}`}>
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
					)}
				</div>
			) : (
				<div
					style={{
						minHeight: "90vh",
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography
						variant="h6"
						fontFamily={theme.fonts.body}
						color={theme.palette.secondary.main}
						textAlign={"start"}
					>
						En este momento no hay ningún {type} disponible
					</Typography>
				</div>
			)}
		</article>
	);
}
