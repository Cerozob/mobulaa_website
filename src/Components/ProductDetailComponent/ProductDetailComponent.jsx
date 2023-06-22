import { React, useEffect, useState } from "react";
import { Grid, Link, Paper, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { PrismicRichText, usePrismicDocumentByUID } from "@prismicio/react";
import { Masonry } from "@mui/lab";
import "./ProductDetailComponent.scss";
// returns a random height in % between lowBound and HighBound
function getRandomHeightValue(lowBound = 35, HighBound = 75) {
	return Math.random() * (HighBound - lowBound) + lowBound;
}

export default function ProductDetail() {
	const params = useParams();
	const model = params.model ?? "";
	const [product, { error }] = usePrismicDocumentByUID("product", model);
	const [currentColor, setCurrentColor] = useState(null);
	const theme = useTheme();

	useEffect(() => {
		if (error) {
			// TODO handle errors
		}
	}, [error]);

	useEffect(() => {
		if (product && product.data.colors.length > 0) {
			setCurrentColor(product.data.colors[0]);
		}
	}, [product]);
	return (
		<Grid
			container
			spacing={0}
			style={{
				backgroundColor: theme.palette.primary.main,
				// height: "100%",
			}}
		>
			<Grid
				item
				xs={12}
				sx={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography
					variant="h3"
					sx={{
						padding: "1rem 1rem 0 2rem",
						color: theme.palette.secondary.main,
						fontFamily: theme.fonts.logo,
						textAlign: "start",
					}}
				>
					{product && product.data.reference}
				</Typography>
				<Typography
					variant="h5"
					sx={{
						padding: "0 1rem 1rem 2rem",
						color: theme.palette.secondary.main,
						fontFamily: theme.fonts.logo,
						textAlign: "start",
					}}
				>
					{product && product.data.type}
				</Typography>
			</Grid>
			<Grid
				container
				minHeight={"75vh"}
				sx={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
				}}
			>
				<Grid
					item
					xs={12}
					sm={12}
					md={12}
					lg={6}
					sx={{
						padding: "0.5rem",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Grid
						container
						sx={{
							display: "flex",
							justifyContent: "stretch",
							width: "100%",
						}}
						spacing={0}
					>
						{product &&
							product.data.colors.map((color) => {
								let thecolor = color.color_value;
								return (
									<Grid
										key={color.color_name}
										className="scaleeffect"
										sx={{
											backgroundColor: thecolor,
											flexGrow: 1,
											height: "10vh",
											borderRadius: "0.5rem",
											margin: "0.5rem",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											cursor: "pointer",
										}}
										onClick={() => setCurrentColor(color)}
									>
										<Typography
											variant="h4"
											className="scaleeffect"
											fontFamily={theme.fonts.header}
											color={"black"}
											sx={{
												opacity: 0.6,
												textAlign: "center",
												fontWeight: "bold",
												WebkitTextStroke:
													"0.5px" + theme.palette.secondary.card,
											}}
										>
											{color.color_name}
										</Typography>
									</Grid>
								);
							})}
					</Grid>
					<Grid
						container
						sx={{
							display: "flex",
							justifyContent: "stretch",
							width: "100%",
						}}
						spacing={0}
					>
						{product?.data.links.length > 0 &&
						product?.data.links.some((link) => link.link.url != null) ? (
							product.data.links.map((linkobj) => {
								let link = linkobj.link;
								let thelink = link.url;
								return (
									<Link
										className="scaleeffect"
										href={thelink}
										target={link.target}
										underline="none"
										rel="noreferrer external"
										sx={{
											// width: `100%`,
											display: "flex",
											flexGrow: 1,
											margin: "0.5rem",
											height: "10vh",
										}}
									>
										<Paper
											key={link.url}
											sx={{
												backgroundColor: theme.palette.secondary.main,
												flexGrow: 1,
												borderRadius: "0.5rem",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Typography
												variant="h4"
												fontFamily={theme.fonts.header}
												color={theme.palette.primary.main}
												sx={{
													textAlign: "center",
													fontWeight: "bold",
													overflowWrap: "break-word",
												}}
											>
												{linkobj.where}
											</Typography>
										</Paper>
									</Link>
								);
							})
						) : (
							<Paper
								sx={{
									backgroundColor: theme.palette.primary.main,
									flexGrow: 1,
									borderRadius: "0.5rem",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									margin: "0.5rem",
									padding: "0.5rem",
								}}
							>
								<Typography
									variant="h5"
									fontFamily={theme.fonts.header}
									color={theme.palette.secondary.main}
									sx={{
										textAlign: "center",
										fontWeight: "bold",
										overflowWrap: "break-word",
									}}
								>
									No hay enlaces de compra disponibles
								</Typography>
							</Paper>
						)}
					</Grid>
					<Grid
						container
						sx={{
							display: "flex",
							justifyContent: "stretch",
							width: "100%",
							flexDirection: "column",
							flexGrow: 1,
							padding: "0.5rem",
						}}
					>
						<Paper
							sx={{
								backgroundColor: theme.palette.primary.main,
								width: "100%",
								// minHeight: "10vh",
								flexGrow: 1,
								borderRadius: "0.5rem",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography
								variant="h4"
								fontFamily={theme.fonts.header}
								color={theme.palette.secondary.main}
								sx={{
									textAlign: "center",
									fontWeight: "bold",
									padding: "0.5rem",
								}}
							>
								{product && (
									<PrismicRichText field={product.data.shortdescription} />
								)}
							</Typography>
						</Paper>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={6} sx={{ padding: "1rem" }}>
					{currentColor && (
						<img
							src={currentColor.image.url}
							alt={currentColor.image.alt}
							style={{
								borderRadius: "0.5rem",
								display: "block",
								objectFit: "cover",
								backgroundColor: theme.palette.primary.dark,
								width: `100%`,
								maxHeight: `75vh`,
								objectPosition: "top center",
							}}
						/>
					)}
				</Grid>
				<Grid
					container
					sx={{
						display: "flex",
						justifyContent: "stretch",
						width: "100%",
						flexDirection: "column",
						flexGrow: 1,
						padding: "1rem",
					}}
				>
					<Paper
						sx={{
							backgroundColor: theme.palette.primary.main,
							width: "100%",
							// minHeight: "10vh",
							flexGrow: 1,
							borderRadius: "0.5rem",

							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Typography
							variant="h6"
							fontFamily={theme.fonts.body}
							color={theme.palette.secondary.main}
							textAlign={"justify"}
							sx={{
								paddingLeft: "2rem",
								paddingRight: "2rem",
							}}
						>
							{product && <PrismicRichText field={product.data.description} />}
						</Typography>
					</Paper>
				</Grid>
				<Grid
					container
					sx={{
						paddingBottom: "1rem",
					}}
				>
					<Masonry
						cols={{
							xs: 1,
							sm: 2,
							lg: 3,
						}}
						// variant="masonry"
						spacing={2}
						sx={{
							width: "100%",
							display: "flex",
							alignContent: "center",
						}}
					>
						{product &&
							product.data.images.map((image) => {
								let randomheight = getRandomHeightValue();
								return (
									<img
										src={image.image.url}
										alt={image.image.alt}
										loading="lazy"
										className="scaleeffect"
										style={{
											borderRadius: "0.5rem",
											display: "block",
											objectFit: "cover",
											backgroundColor: theme.palette.primary.dark,
											width: `30%`,
											height: `${randomheight}vh`,
										}}
										onClick={() => console.log("click")}
									/>
								);
							})}
					</Masonry>
				</Grid>
			</Grid>
			{/* {product ? null : (
				// <Grid item xs={12}>
				// 	<Typography
				// 		variant="h6"
				// 		sx={{
				// 			padding: "3rem",
				// 			color: theme.palette.secondary.main,
				// 			fontFamily: theme.fonts.body,
				// 			textAlign: "center",
				// 		}}
				// 	>
				// 		<pre>{JSON.stringify(product, null, 1)}</pre>
				// 	</Typography>
				// </Grid>
				<Grid
					container
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						height: "90vh",
					}}
				>
					<Typography
						variant="h5"
						sx={{
							padding: "3rem",
							color: theme.palette.secondary.main,
							fontFamily: theme.fonts.body,
							textAlign: "center",
						}}
					>
						No se encontró un producto con el modelo {model}
					</Typography>
				</Grid>
			)} */}
		</Grid>
	);
}
