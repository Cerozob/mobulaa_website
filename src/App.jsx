import { Route, Routes } from "react-router-dom";
import { createContext, useMemo, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./App.css";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contacto from "./Pages/Contacto/Contacto";
import Soporte from "./Pages/Soporte/Soporte";
import Products from "./Pages/Products/Products";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavbarComponent from "./Components/NavbarComponent/NavbarComponent";
import ProductDetailComponent from "./Components/ProductDetailComponent/ProductDetailComponent";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const baseTheme = createTheme({
	fonts: {
		logo: ["VAGBold"].join(","),
		header: ["VAGBold", "Helvetica Neue", "Helvetica", "Open Sans"].join(","),
		body: ["TenoriteRegular", "Open Sans", "Roboto"].join(","),
	},
});

const lightTheme = createTheme({
	...baseTheme,
	palette: {
		mode: "light",
		primary: {
			main: "#ffffff",
			card: "#222222",
		},
		secondary: {
			main: "#222222",
			card: "#ffffff",
		},
		accent: {
			main: "#27316e",
		},
	},
});

const darkTheme = createTheme({
	...baseTheme,
	palette: {
		mode: "dark",
		primary: {
			main: "#27316e",
			card: "#1e2650",
		},
		secondary: {
			main: "#ffffff",
			card: "#ffffff",
		},
		accent: {
			main: "#000000",
		},
	},
});

function App() {
	let prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[]
	);

	const theme = useMemo(
		() => (mode === "dark" ? darkTheme : lightTheme),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<div
					className="App"
					style={{
						backgroundColor: theme.palette.primary.main,
					}}
				>
					<NavbarComponent />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/productos/:type?" element={<Products />} />
						<Route
							path="/productos/:type/:model"
							element={<ProductDetailComponent />}
						/>
						<Route path="/nosotros" element={<About />} />
						<Route path="/contacto" element={<Contacto />} />
						<Route path="/soporte" element={<Soporte />} />
					</Routes>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
