import * as Types from "./actionTypes";
import axios from "axios";
import { JSON_SERVER_URL } from "../../utils";

const LawyerAPI = axios.create({
  baseURL: JSON_SERVER_URL,
});

export const getLawyers = () => (dispatch) => {};
