import * as Types from "./actionTypes";

const initialState = {
	loading: false,
	lawyers: [],
	error: "",
};

export const lawyersReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case Types.FETCH_LAWYERS_INIT:
			return {
				...state,
				loading: true,
			};
		case Types.FETCH_LAWYERS_SUCCESS:
			return {
				...state,
				loading: false,
				lawyers: payload,
			};
		case Types.FETCH_LAWYERS_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case Types.DATA_REORDER_DRAGG:
			return { ...state, lawyers: payload };

		default:
			return state;
	}
};
