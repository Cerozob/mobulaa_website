import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter /*, ScrollRestoration*/ } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PrismicProvider } from "@prismicio/react";
import { client } from "./prismic";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<PrismicProvider client={client}>
			<HashRouter>
				<App />
				{/* <ScrollRestoration
					getKey={(location, matches) => {
						return location.pathname;
					}}
				/> */}
			</HashRouter>
		</PrismicProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();