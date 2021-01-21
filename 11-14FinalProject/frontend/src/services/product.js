import httpService from "./http";
import { apiEnpoint } from "../config.json";

function productUrl(id) {
  return apiEnpoint + `products/${id}`;
}

export function getProducts() {
  return httpService.get(apiEnpoint + "products");
}

export function getProduct(id) {
  return httpService.get(productUrl(id));
}

export function saveProduct(product) {
  if (product._id) {
    const body = { ...product };
    delete body._id;
    return httpService.put(productUrl(product._id), body);
  }

  return httpService.post(apiEnpoint + "products", product);
}

export function updateProduct(product) {
  if (product._id) {
    const body = { ...product };
    delete body._id;
    return httpService.put(productUrl(product._id), body);
  }
}

export function deleteProduct(id) {
  return httpService.delete(productUrl(id));
}
