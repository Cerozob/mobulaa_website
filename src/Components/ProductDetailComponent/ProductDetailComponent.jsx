import { React, useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { usePrismicDocumentByUID } from "@prismicio/react";

export default function ProductDetail() {
	const params = useParams();
	const model = params.model ?? "";
	const [product, { state, error }] = usePrismicDocumentByUID("product", model);
	const [productObject, setProductObject] = useState({});

	const theme = useTheme();

	useEffect(() => {
		if (product) {
			setProductObject(product);
		}
	}, [product]);

	useEffect(() => {
		if (error) {
			console.log(error);
		}
	}, [error]);

	return (
		<Box
			style={{
				backgroundColor: theme.palette.primary.main,
				height: "auto",
			}}
		>
			<Typography
				variant="h1"
				sx={{
					p: 3,
					color: theme.palette.secondary.main,
					fontFamily: theme.fonts.logo,
				}}
			>
				{model}
			</Typography>
			<Typography
				variant="p"
				sx={{
					p: 3,
					color: theme.palette.secondary.main,
					fontFamily: theme.fonts.body,
				}}
			>
				{(product && JSON.stringify(productObject)) ??
					`No se encontró un producto con el modelo ${model}`}
			</Typography>
		</Box>
	);
}