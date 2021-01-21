import http from "./http";
import { apiEnpoint } from "../config.json";
import jwtDecode from "jwt-decode";

const endpoint = apiEnpoint + "auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(phoneNumber, password) {
  const { data: jwt } = await http.post(endpoint, {
    phoneNumber,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
