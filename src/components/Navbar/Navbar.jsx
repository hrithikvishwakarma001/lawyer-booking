import React from "react";
import { Navbar, Text, Input } from "@nextui-org/react";
import styles from "./Navbar.module.css";
import { SearchIcon } from "../../icons";
import { useDebounce } from "../../hook";
import { useDispatch } from "react-redux";
import { filterLawyers } from "../../redux/lawyersReducer/action";
const Nav = () => {
	const [search, setSearch] = React.useState("");
	const dispatch = useDispatch();
	const operation = (query) => {
		dispatch(filterLawyers(query));
	};
	const debouncedSearchTerm = useDebounce(operation, 600);

	React.useEffect(() => {
		debouncedSearchTerm(search);
	}, [search]);
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
					value={search}
					onChange={(e) => setSearch(e.target.value)}
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
