import * as Types from "./actionTypes";
import axios from "axios";
import { JSON_SERVER_URL } from "../../utils";

const LawyerAPI = axios.create({
	baseURL: `${JSON_SERVER_URL}/lawyers`,
});

export const getLawyers = () => async (dispatch) => {
	dispatch({ type: Types.FETCH_LAWYERS_INIT });
	try {
		const response = await LawyerAPI.get("/");
		dispatch({ type: Types.FETCH_LAWYERS_SUCCESS, payload: response.data });
	} catch (error) {
		dispatch({ type: Types.FETCH_LAWYERS_FAILURE, payload: error });
		console.log(error);
	}
};
