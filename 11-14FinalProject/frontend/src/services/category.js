import httpService from "./http";
import { apiEnpoint } from "../config.json";

export function getCategories() {
  return httpService.get(apiEnpoint + "categories");
}
