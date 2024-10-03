import { EUrl } from "@utils/base-url";
import axios from "axios";

export const authHost = axios.create({
  baseURL: EUrl.BASE_API_URL,
});
