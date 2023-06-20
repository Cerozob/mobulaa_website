import { React, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import { useAllPrismicDocumentsByType } from "@prismicio/react";
import { Link } from "react-router-dom";
import "./Home.scss";
import { Typography } from "@mui/material";
import ProductListComponent from "../../Components/ProductListComponent/ProductListComponent";
import {
	findProductsByType,
	findSuggestedProducts as findFeaturedProducts,
} from "../../prismic";

export default function Home() {
	const theme = useTheme();
	const [banners] = useAllPrismicDocumentsByType("banner");

	const [phones, setPhones] = useState([]);
	const [totalNOfPhones, setTotalNOfPhones] = useState(0);
	const [watches, setWatches] = useState([]);
	const [totalNOfWatches, setTotalNOfWatches] = useState(0);
	const [basicphones, setBasicphones] = useState([]);
	const [totalNOfBasicphones, setTotalNOfBasicphones] = useState(0);
	const [featured, setFeatured] = useState([]);
	const [totalNOfFeatured, setTotalNOfFeatured] = useState(0);

	useEffect(() => {
		findProductsByType().then((response) => {
			setPhones(response.results);
			setTotalNOfPhones(response.total_results_size);
		});
	}, []);
	useEffect(() => {
		findProductsByType("Smartwatch").then((response) => {
			setWatches(response.results);
			setTotalNOfWatches(response.total_results_size);
		});
	}, []);
	useEffect(() => {
		findProductsByType("Basicphone").then((response) => {
			setBasicphones(response.results);
			setTotalNOfBasicphones(response.total_results_size);
		});
	}, []);
	useEffect(() => {
		findFeaturedProducts().then((response) => {
			setFeatured(response.results);
			setTotalNOfFeatured(response.total_results_size);
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
					autoPlay={true}
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
						disableRipple: true,
					}}
					style={{
						overflow: "hidden",
						// minHeight: "740px",
						// height: "90%",
						objectFit: "cover",
					}}
				>
					{banners &&
						banners.map((banner) => {
							let item = banner.data;

							return (
								<Link
									to={`/productos/${item.type.toLowerCase()}s/${
										item.productuid
									}`}
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
						padding: "1rem 1rem 1rem 2rem",
						alignContent: "start",
						fontFamily: titleFont,
						fontWeight: "bold",
						color: theme.palette.secondary.main,
						height: "100%",
					}}
				>
					Recomendados
				</Typography>
				<ProductListComponent
					items={featured.map((product) => product.data)}
					type="Featured"
					totalItems={totalNOfFeatured}
				/>
			</section>
			<section id="smartphones">
				<Typography
					variant="h4"
					style={{
						display: "flex",
						padding: "1rem 1rem 1rem 2rem",

						alignContent: "start",
						fontFamily: titleFont,
						fontWeight: "bold",
						color: theme.palette.secondary.main,
						height: "10%",
					}}
				>
					Smartphones
				</Typography>

				<ProductListComponent
					items={phones.map((phone) => phone.data)}
					type="Smartphone"
					totalItems={totalNOfPhones}
				/>
			</section>
			<section id="smartwatches">
				<Typography
					variant="h4"
					style={{
						display: "flex",
						padding: "1rem 1rem 1rem 2rem",

						alignContent: "start",
						fontFamily: titleFont,
						fontWeight: "bold",
						color: theme.palette.secondary.main,
						height: "10%",
					}}
				>
					Smartwatches
				</Typography>
				<ProductListComponent
					items={watches.map((watch) => watch.data)}
					type="Smartwatch"
					totalItems={totalNOfWatches}
				/>
			</section>
			<section id="basicphones">
				<Typography
					variant="h4"
					style={{
						display: "flex",
						padding: "1rem 1rem 1rem 2rem",

						alignContent: "start",
						fontFamily: titleFont,
						fontWeight: "bold",
						color: theme.palette.secondary.main,
						height: "10%",
					}}
				>
					Basicphones
				</Typography>
				<ProductListComponent
					items={basicphones.map((phone) => phone.data)}
					type={"Basicphone"}
					totalItems={totalNOfBasicphones}
				/>
			</section>
			{/* <section
				id="all"
				style={{
					paddingBottom: "3rem",
				}}
			>
				<Typography
					variant="h4"
					style={{
						display: "flex",
						flexDirection: "column",
						padding: "1rem 1rem 1rem 2rem",

						fontFamily: titleFont,
						fontWeight: "bold",
						color: theme.palette.secondary.main,
						height: "10%",
					}}
				>
					Todos nuestros productos
				</Typography>
				<ProductListComponent
					items={phones
						.map((phone) => phone.data)
						.concat(
							watches.map((watch) => watch.data),
							basicphones.map((phone) => phone.data)
						)}
					type={"Any"}
					totalItems={totalNOfPhones + totalNOfWatches + totalNOfBasicphones}
				/>
			</section> */}
		</article>
	);
}
