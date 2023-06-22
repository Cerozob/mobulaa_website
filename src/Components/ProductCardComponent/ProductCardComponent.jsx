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
import PlaceHolderComponent from "../PlaceHolderComponent/PlaceHolderComponent";

export default function ProductCardComponent({ product, itemsPerRow = 3 }) {
	const theme = useTheme();
	return (
		<Grid
			item
			sm={12}
			md={Math.floor(24 / itemsPerRow)}
			lg={Math.floor(12 / itemsPerRow)}
			key={product.uid}
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				padding: "1rem",
				width: "100%",
			}}
		>
			<Card
				sx={{
					width: "100%",
					height: "75vh",
					objectFit: "contain",
					backgroundColor: theme.palette.primary.card,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					borderRadius: "0.5rem",
				}}
			>
				<CardActionArea
					component={Link}
					to={`/productos/${product.data.type.toLowerCase()}s/${product.uid}`}
					style={{
						textDecoration: "none",
						color: theme.palette.secondary.card,
						height: "70%",
						width: "95%",
						objectFit: "contain",
						alignContent: "center",
						verticalAlign: "middle",
						margin: "1rem auto 0 auto",
					}}
				>
					{product.data.thumbnail.url != null ? (
						<CardMedia
							component="img"
							className="cardthumbnail"
							image={product.data.thumbnail.url}
							alt={product.data.thumbnail.alt}
							style={{
								// TODO ver si contain o cover
								objectFit: "cover",
								borderRadius: "0.5rem",
							}}
						/>
					) : (
						<PlaceHolderComponent />
					)}
				</CardActionArea>
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						maxWidth: "100%",
						bottom: "0",
						height: "20%",
					}}
				>
					<Typography
						variant="h3"
						sx={{
							fontFamily: theme.fonts.header,
							fontWeight: "bold",
							textAlign: "start",
							color: theme.palette.secondary.card,
						}}
					>
						<Link
							to={`/productos/${product.data.type.toLowerCase()}s/${
								product.uid
							}`}
							style={{
								textDecoration: "none",
								color: theme.palette.secondary.card,
							}}
						>
							{product.data.display}
						</Link>
					</Typography>

					<Typography
						variant="h6"
						fontFamily={theme.fonts.body}
						color={theme.palette.secondary.card}
						textAlign={"start"}
					>
						<PrismicRichText field={product.data.shortdescription} />
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}
