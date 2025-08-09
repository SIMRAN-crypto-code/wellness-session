import API from "./api";

// Login call
export function loginUser(credentials) {
  return API.post("auth/login", credentials);
}

// Register call
export function registerUser(data) {
  return API.post("/auth/register", data);
}
