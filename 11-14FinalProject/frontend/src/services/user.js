import httpService from "./http";
import { apiEnpoint } from "../config.json";

const endpoint = apiEnpoint + "users";

function userUrl(id) {
  return apiEnpoint + `users/${id}`;
}

export function register(user) {
  return httpService.post(endpoint, {
    phoneNumber: user.phoneNumber,
    password: user.password,
    name: user.name,
  });
}
export function updateUser(user) {
  console.log(user);
  if (user._id) {
    const body = { ...user };
    delete body._id;
    return httpService.put(userUrl(user._id), body);
  }
}

export function getUser(id) {
  return httpService.get(userUrl(id));
}
