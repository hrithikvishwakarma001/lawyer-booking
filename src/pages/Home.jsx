import React from "react";
import { LawyersList } from "../components";
import * as RR from "react-redux";
import { getLawyers } from "../redux/lawyersReducer/action";
import { Progress } from "@nextui-org/react";
function Home() {
	const { lawyers, loading } = RR.useSelector((store) => store.lawyers);
	const dispatch = RR.useDispatch();

	React.useEffect(() => {
		dispatch(getLawyers());
	}, [dispatch]);
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
			{!loading && <LawyersList lawyersList={lawyers} />}
		</React.Fragment>
	);
}

export default Home;
