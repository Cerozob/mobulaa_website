import React from "react";
import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";

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
	let type = params.type ?? "smartphones";
	const [value, setValue] = useState(type);
	const theme = useTheme();
	const navigate = useNavigate();

	const handleChange = (event, newValue) => {
		setValue(newValue);
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
				value={value}
				onChange={handleChange}
				centered
				textColor="secondary"
				indicatorColor="secondary"
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
					value={"smartphones"}
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
					value={"smartwatches"}
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
					value={"basicphones"}
				/>
			</Tabs>
			<TabPanel
				value={value}
				index={"smartphones"}
				dir={theme.direction}
				height="100%"
			>
				<Typography
					sx={{ fontSize: "56px", p: 3, color: theme.palette.secondary.main }}
				>
					Smartphones WIP
				</Typography>
			</TabPanel>
			<TabPanel value={value} index={"smartwatches"} dir={theme.direction}>
				<Typography
					sx={{ fontSize: "56px", p: 3, color: theme.palette.secondary.main }}
				>
					Smartwatches WIP
				</Typography>
			</TabPanel>
			<TabPanel value={value} index={"basicphones"} dir={theme.direction}>
				<Typography
					sx={{ fontSize: "56px", p: 3, color: theme.palette.secondary.main }}
				>
					Basic phones WIP
				</Typography>
			</TabPanel>
		</Box>
	);
}
