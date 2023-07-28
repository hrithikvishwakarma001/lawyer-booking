import "./App.css";
import React from "react";
import { Navbar } from "./components";
import { Home } from "./pages";
import { Container } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
	return (
		<Container fixed>
			<Navbar />
			<Home />
			<ToastContainer />
		</Container>
	);
}

export default App;
