import "./App.css";
import React from "react";
import { Navbar } from "./components";
import { Home } from "./pages";
import { Container } from "@mui/material";

function App() {
	return (
		<Container fixed>
			<Navbar />
			<Home />
		</Container>
	);
}

export default App;
