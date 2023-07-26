import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { lawyersReducer } from "./lawyersReducer/reducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
	lawyers: lawyersReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
