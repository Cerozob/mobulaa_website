import React from "react";
import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import TopnProductsComponent from "../../Components/TopnProductsComponent/TopnProductsComponent";
import { findProductsByType } from "../../prismic";
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

export default function Products() {
	const params = useParams();
	const theme = useTheme();
	const navigate = useNavigate();
	const itemsperpage = 6;

	let type = params.type ?? "smartphones";
	if (type === "featureds" || type === "anys") {
		type = "smartphones";
	} else if (type === "smartwatchs") {
		type = "smartwatches";
	}
	const [currentType, setCurrentType] = useState(type);
	const [items, setItems] = useState([]);
	const [totalNOfItems, setTotalNOfItems] = useState(0);

	useEffect(() => {
		findProductsByType(currentType, 1, itemsperpage).then((response) => {
			setItems(response.results);
			setTotalNOfItems(response.total_results_size);
		});
	}, [currentType]);

	const handleChange = (event, newValue) => {
		setCurrentType(newValue);
		navigate("../productos/" + newValue);
	};

	return (
		<Box
			style={{
				backgroundColor: theme.palette.primary.main,
				height: "auto",
			}}
		>
			<Tabs
				value={currentType}
				onChange={handleChange}
				centered
				textColor="secondary"
				indicatorColor="secondary"
				variant="fullWidth"
				scrollButtons="auto"
				allowScrollButtonsMobile
			>
				<Tab
					label={
						<Typography
							sx={{
								p: 3,
								color: theme.palette.secondary.main,
								fontFamily: theme.fonts.header,
							}}
						>
							Smartphones
						</Typography>
					}
					value={"Smartphone"}
				/>
				<Tab
					label={
						<Typography
							sx={{
								p: 3,
								color: theme.palette.secondary.main,
								fontFamily: theme.fonts.header,
							}}
						>
							Smartwatches
						</Typography>
					}
					value={"Smartwatch"}
				/>
				<Tab
					label={
						<Typography
							sx={{
								p: 3,
								color: theme.palette.secondary.main,
								fontFamily: theme.fonts.header,
							}}
						>
							Basic phones
						</Typography>
					}
					value={"Basicphone"}
				/>
			</Tabs>
			<TabPanel
				value={currentType}
				index={currentType}
				dir={theme.direction}
				height="100%"
			>
				<TopnProductsComponent
					items={items.map((item) => item.data)}
					type={currentType}
					totalItems={totalNOfItems}
					n={Math.min(itemsperpage, totalNOfItems)}
					pagination={true}
				/>
			</TabPanel>
		</Box>
	);
}
