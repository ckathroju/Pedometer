import axios from "axios";
import { API_BASEURI } from "../constants";

export default axios.create({
  baseURL: API_BASEURI,
  timeout: 30000,
});
