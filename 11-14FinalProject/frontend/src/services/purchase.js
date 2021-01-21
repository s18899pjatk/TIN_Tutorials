import httpService from "./http";
import { apiEnpoint } from "../config.json";

const endpoint = apiEnpoint + "purchases";

export function purchase(userId, productId) {
  return httpService.post(endpoint, {
    userId,
    productId,
  });
}

export function getPurchases() {
  return httpService.get(endpoint);
}
