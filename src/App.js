import "./App.css";
import React from "react";
import { Container } from "@nextui-org/react";
import { Navbar } from "./components";
import { Home } from "./pages";

function App() {
	return (
		<Container lg responsive>
			<Navbar />
			<Home />
		</Container>
	);
}

export default App;
