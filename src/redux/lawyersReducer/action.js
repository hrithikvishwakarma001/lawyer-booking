import * as Types from "./actionTypes";
import axios from "axios";
import { JSON_SERVER_URL } from "../../utils";
import { toast } from "react-toastify";

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

export const filterLawyers = (searchTerm) => async (dispatch) => {
	dispatch({ type: Types.FETCH_LAWYERS_INIT });
	try {
		const response = await LawyerAPI.get(`?q=${searchTerm}`);
		dispatch({ type: Types.FETCH_LAWYERS_SUCCESS, payload: response.data });
	} catch (error) {
		dispatch({ type: Types.FETCH_LAWYERS_FAILURE, payload: error });
		console.log(error);
	}
};

export const EditLawyerBookingStatus = (id) => async (dispatch) => {
	try {
		let res = await LawyerAPI.patch(`/${id}`, {
			isBooked: true,
		});
		if (res.status === 200) {
			dispatch(getLawyers());
			toast.success("Booking Successful");
		} else {
			toast.error("Booking Failed");
		}
	} catch (error) {
		dispatch({ type: Types.FETCH_LAWYERS_FAILURE, payload: error });
		console.log(error);
	}
};
