import axios from "axios";

export const api = axios.create({ baseURL: "/api" });
const jetonExistant = localStorage.getItem("alert-e2c-token");
if (jetonExistant) {
  api.defaults.headers.common.Authorization = `Bearer ${jetonExistant}`;
}

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("alert-e2c-token", token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem("alert-e2c-token");
  }
}

export const loginCitoyen = ({ telephone, motDePasse }) =>
  api.post("/auth/login", { telephone, motDePasse }).then((r) => r.data);

export const loginAgent = ({ telephone, motDePasse }) =>
  api.post("/auth/agent/login", { telephone, motDePasse }).then((r) => r.data);

export const registerCitoyen = ({ nom, telephone, motDePasse }) =>
  api
    .post("/auth/register", { nom, telephone, motDePasse })
    .then((r) => r.data);
