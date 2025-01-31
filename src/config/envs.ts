export const MODE = import.meta.env.MODE;
export const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
export const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;
export const NODE_ENV = import.meta.env.VITE_NODE_ENV;
export const BASE_API = import.meta.env.VITE_BASE_API;
export const SUPPRESS_LOGOUT_BY_SERVER_CONNECTION_FAILD = import.meta.env
  .VITE_SUPPRESS_LOGOUT_BY_SERVER_CONNECTION_FAILD;
export const USE_ENC = import.meta.env.VITE_USE_ENC;

export const isProduction = NODE_ENV === "production";

export const baseApi = BASE_API;
/** @type {boolean} */
export const suppressLogoutByServerConnectionFaild =
  SUPPRESS_LOGOUT_BY_SERVER_CONNECTION_FAILD || false;
export const MEDIUM_REQUEST_TIMEOUT = Number(
  import.meta.env.VITE_MEDIUM_REQUEST_TIMEOUT
);
