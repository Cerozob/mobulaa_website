import { React, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import {
	useAllPrismicDocumentsByType,
	usePrismicClient,
} from "@prismicio/react";
import { predicate } from "@prismicio/client";
import { Link } from "react-router-dom";
import "./Home.scss";
import { Typography } from "@mui/material";
import ProductListComponent from "../../Components/ProductListComponent/ProductListComponent";
import { findProductsByType } from "../../prismic";

export default function Home() {
	const theme = useTheme();
	const [banners, { state, bannererror }] =
		useAllPrismicDocumentsByType("banner");

	const [phones, setPhones] = useState([]);

	useEffect(() => {
		findProductsByType().then((response) => {
			console.log("a repueta", response);
			setPhones(response.results);
		});
	}, []);

	const titleFont = theme.fonts.logo;

	return (
		<article>
			<section id="carousel">
				<Carousel
					animation="slide"
					swipe={true}
					fullHeightHover
					interval={5000}
					indicators={false}
					cycleNavigation={true}
					navButtonsWrapperProps={{
						style: {
							height: "100%",
							width: "5%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						},
					}}
					navButtonsProps={{
						id: "carouselButtons",
						style: {
							color: theme.palette.secondary.main,
						},
					}}
					style={{
						overflow: "hidden",
					}}
				>
					{banners &&
						banners.map((banner) => {
							let item = banner.data;

							return (
								<Link
									to={`/productos/${item.type}s/${item.model}`}
									style={{
										padding: 0,
									}}
								>
									<img
										className="carouselimg"
										src={item.image.url}
										alt={item.image.alt}
									/>
								</Link>
							);
						})}
				</Carousel>
			</section>
			<section id="featured">
				<Typography
					variant="h4"
					style={{
						display: "flex",
						padding: "1rem",
						alignContent: "start",
						fontFamily: titleFont,
						fontWeight: "bold",
						color: theme.palette.secondary.main,
					}}
				>
					Recomendados
				</Typography>
			</section>
			<section id="smartphones">
				<Typography
					variant="h4"
					style={{
						display: "flex",
						padding: "1rem",
						alignContent: "start",
						fontFamily: titleFont,
						fontWeight: "bold",
						color: theme.palette.secondary.main,
					}}
				>
					Smartphones
				</Typography>

				<ProductListComponent></ProductListComponent>
			</section>
			<section id="smartwatches">
				<Typography
					variant="h4"
					style={{
						display: "flex",
						padding: "1rem",
						alignContent: "start",
						fontFamily: titleFont,
						fontWeight: "bold",
						color: theme.palette.secondary.main,
					}}
				>
					Smartwatches
				</Typography>
				<ProductListComponent></ProductListComponent>
			</section>
			<section id="basicphones">
				<Typography
					variant="h4"
					style={{
						display: "flex",
						padding: "1rem",
						alignContent: "start",
						fontFamily: titleFont,
						fontWeight: "bold",
						color: theme.palette.secondary.main,
					}}
				>
					Basicphones
				</Typography>
				<ProductListComponent></ProductListComponent>
			</section>
			<section id="all">
				<Typography
					variant="h4"
					style={{
						display: "flex",
						flexDirection: "column",
						padding: "1rem",
						fontFamily: titleFont,
						fontWeight: "bold",
						color: theme.palette.secondary.main,
					}}
				>
					Todos nuestros productos
				</Typography>
			</section>
		</article>
	);
}
