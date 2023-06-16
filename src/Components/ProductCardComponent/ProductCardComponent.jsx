import React from "react";
import { useTheme } from "@mui/material/styles";
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material";
import "./ProductCardComponent.scss";
import { PrismicRichText } from "@prismicio/react";
import { Link } from "react-router-dom";

export default function ProductCardComponent({ product }) {
	const theme = useTheme();
	return (
		<Grid
			item
			md={12}
			lg={4}
			key={product.uid}
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				padding: "1rem",
			}}
		>
			<Card
				sx={{
					width: "100%",
					height: "75vh",
					objectFit: "contain",
					backgroundColor: theme.palette.primary.main,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<CardActionArea
					component={Link}
					to={`/productos/${product.data.type.toLowerCase()}s/${product.uid}`}
					style={{
						textDecoration: "none",
						color: theme.palette.secondary.main,
						height: "75%",
						objectFit: "contain",
						alignContent: "center",
						verticalAlign: "middle",
					}}
				>
					<CardMedia
						component="img"
						className="cardthumbnail"
						image={product.data.thumbnail.url}
						alt={product.data.thumbnail.alt}
						style={{
							objectFit: "contain",
							height: "100%",
						}}
					/>
				</CardActionArea>
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						maxWidth: "100%",
					}}
				>
					<Typography
						variant="h3"
						sx={{
							fontFamily: theme.fonts.header,
							fontWeight: "bold",
							textAlign: "start",
						}}
					>
						<Link
							to={`/productos/${product.data.type.toLowerCase()}s/${
								product.uid
							}`}
							style={{
								textDecoration: "none",
								color: theme.palette.secondary.main,
							}}
						>
							{product.data.display}
						</Link>
					</Typography>
					<Typography
						variant="h6"
						fontFamily={theme.fonts.body}
						color={theme.palette.secondary.main}
						textAlign={"start"}
						marginBottom={"5rem"}
					>
						<PrismicRichText field={product.data.shortdescription} />
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}
