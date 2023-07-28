import React from "react";
import { LawyersList } from "../components";
import * as RR from "react-redux";
import { Progress, Text } from "@nextui-org/react";
function Home() {
	const { lawyers, loading } = RR.useSelector((store) => store.lawyers);
	return (
		<React.Fragment>
			{loading && (
				<Progress
					indeterminated
					value={50}
					size='xs'
					striped
					color='secondary'
					status='secondary'
				/>
			)}
			{lawyers.length === 0 && (
				<Text
					h4
					b
					css={{
						textAlign: "center",
						marginTop: "50px",
					}}>
					No Lawyers Found
				</Text>
			)}
			{lawyers.length > 0 && <LawyersList lawyersList={lawyers} />}
		</React.Fragment>
	);
}

export default Home;
