import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "/api";
export const api = axios.create({ baseURL: apiBaseUrl });
const serverOrigin = /^https?:\/\//i.test(apiBaseUrl) ? new URL(apiBaseUrl).origin : "";

export function publicFileUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${serverOrigin}${path.startsWith("/") ? path : `/${path}`}`;
}
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

export function setAuthUser(user) {
  if (user) {
    localStorage.setItem("alert-e2c-user", JSON.stringify(user));
  } else {
    localStorage.removeItem("alert-e2c-user");
  }
}

export function setAgentAuth(token, user) {
  if (token) {
    localStorage.setItem('alert-e2c-agent-token', token)
    localStorage.setItem('alert-e2c-agent-user', JSON.stringify(user || null))
  } else {
    localStorage.removeItem('alert-e2c-agent-token')
    localStorage.removeItem('alert-e2c-agent-user')
  }
}

export function getAgentToken() {
  return localStorage.getItem('alert-e2c-agent-token')
}

export function getAgentUser() {
  try {
    return JSON.parse(localStorage.getItem('alert-e2c-agent-user') || 'null')
  } catch {
    return null
  }
}

export function agentRequestConfig() {
  const token = getAgentToken()
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
}

export function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem("alert-e2c-user") || "null");
  } catch {
    return null;
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
