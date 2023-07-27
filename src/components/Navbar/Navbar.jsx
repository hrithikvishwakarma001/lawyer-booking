import React from "react";
import {  Navbar, Text, Input } from "@nextui-org/react";
import styles from "./Navbar.module.css";
import { SearchIcon } from "../../icons";

const Nav = () => {
	return (
		<Navbar
		  className={styles.container}
			isBordered
			variant={"floating"}
			style={{ marginBottom: "50px" }}>
			<Navbar.Brand>
				<Text b size={"$2xl"} color='inherit' hideIn='xs'>
					Lawyers
				</Text>
			</Navbar.Brand>
			<Navbar.Content>
				<Input
					clearable
					contentLeft={
						<SearchIcon
							fill='var(--nextui-colors-accents6)'
							size={16}
						/>
					}
					contentLeftStyling={false}
					css={{
						w: "100%",
						"@xsMax": {
							mw: "350px",
						},
						"& .nextui-input-content--left": {
							h: "100%",
							ml: "$4",
							dflex: "center",
						},
					}}
					placeholder='Search...'
				/>
			</Navbar.Content>
		</Navbar>
	);
};

export default Nav;
