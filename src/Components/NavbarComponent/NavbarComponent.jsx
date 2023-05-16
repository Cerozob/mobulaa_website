import { ReactComponent as Logo } from "./../../Assets/icon/logo.svg";
import { ReactComponent as LogoText } from "./../../Assets/icon/logo_text.svg";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import DarkModeToggleComponent from "../DarkModeToggle/DarkModeToggleComponent";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const pages = {
	Nosotros: "/nosotros",
	Contacto: "/contacto",
	Soporte: "/soporte",
	Productos: "/productos",
};

export default function NavbarComponent() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const theme = useTheme();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="sticky">
			<Container
				maxWidth="100%"
				style={{
					backgroundColor: theme.palette.primary.main,
					padding: "0",
				}}
			>
				<Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
					<Box
						sx={{
							display: { xs: "flex", lg: "none" },
							justifyContent: "flex-start",
						}}
					>
						<IconButton
							size="large"
							aria-label="Menú de navegación"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
							sx={{
								display: { md: "flex", lg: "none" },
								justifyContent: "flex-start",
								marginLeft: "1rem",
							}}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { md: "block", lg: "none" },
							}}
						>
							{Object.keys(pages).map((page) => {
								let route = pages[page];
								return (
									<MenuItem key={page} onClick={handleCloseNavMenu}>
										<Typography textAlign="center">
											<Link
												style={{
													textDecoration: "none",
													color: theme.palette.secondary.main,
												}}
												to={route}
											>
												{page}
											</Link>
										</Typography>
									</MenuItem>
								);
							})}
						</Menu>
					</Box>
					<IconButton
						disableRipple={true}
						disableFocusRipple={true}
						width="30vw"
						style={{
							padding: "1rem",
							display: "flex",
							flexDirection: "row",
						}}
					>
						<Link
							to="/"
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								width: "100%",
							}}
						>
							<Logo
								className="Mobulaa-logo"
								alt="logo"
								style={{
									fill: theme.palette.secondary.main,
									height: "3rem",

									marginRight: "0.5rem",
									marginLeft: "1rem",
								}}
							/>
							<LogoText
								className="App-logo-text"
								alt="logo"
								style={{
									fill: theme.palette.secondary.main,
									height: "3rem",
									marginRight: "1rem",
									marginLeft: "0.5rem",
								}}
							/>
						</Link>
					</IconButton>
					<Box
						sx={{
							flexGrow: 1,
							display: {
								xs: "none",
								md: "none",
								lg: "flex",
								flexDirection: "row-reverse",
							},
						}}
					>
						{Object.keys(pages).map((page) => {
							let route = pages[page];
							return (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Button
										style={{
											backgroundColor: theme.palette.secondary.main,
										}}
										disableRipple={true}
										disableFocusRipple={true}
										disableTouchRipple={true}
									>
										<Link to={route}>
											<Typography
												sx={{
													textAlign: "center",
													textDecoration: "none",
													color: theme.palette.primary.main,
													fontWeight: "bold",
												}}
											>
												{page}
											</Typography>
										</Link>
									</Button>
								</MenuItem>
							);
						})}
					</Box>

					<Box sx={{ flexGrow: 0, marginRight: "1rem" }}>
						<DarkModeToggleComponent />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
