import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method
} from "axios";
import { Axios, AxiosError } from "axios";
import { get, isArray } from "es-toolkit/compat";

import { Nullable } from "@/types/common";
import {
  ACCESS_TOKEN,
  ENDPOINT_URL,
  MEDIUM_REQUEST_TIMEOUT
} from "@/config/envs";
import { generateQueryParams } from "@/lib/axios/utils";

interface Interceptor<V> {
  onFulfilled?: Nullable<(value: V) => V | Promise<V>>;
  onRejected?: Nullable<(error: any) => any>;
}

// Local Access Token 사용시
if (ACCESS_TOKEN) {
  document.cookie = `token=${ACCESS_TOKEN}; SameSite=None; Secure`;
}

// Axios Initialize
export const config: AxiosRequestConfig = {
  baseURL: ENDPOINT_URL,
  timeout: 300000,
  paramsSerializer: generateQueryParams,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json"
  },
  transformRequest: (data, headers) => {
    if (
      data &&
      headers["Content-Type"]?.toString().includes("application/json")
    ) {
      return JSON.stringify(data || {});
    } else if (
      data &&
      headers["Content-Type"]?.toString().includes("multipart/form-data")
    ) {
      const formData = new FormData();
      for (const key in data) formData.append(key, get(data, key));
      return formData;
    } else return data;
  }
};

const requestInterceptor: Interceptor<InternalAxiosRequestConfig> = {
  onFulfilled: (config) => config,
  onRejected: (error) => error
};

const responseInterceptor: Interceptor<AxiosResponse> = {
  onFulfilled: (config) => {
    if (
      config.data &&
      config.headers["content-type"]?.toString().includes("application/json")
    ) {
      try {
        config.data = JSON.parse(config.data);
      } catch {
        throw new Error("Axios Parse Error");
      }
    }

    if (
      typeof config.data === "string" &&
      config.data.includes("<!doctype html>")
    ) {
      throw new AxiosError("Not Found", "404", undefined, undefined, config);
    }

    if (config.status >= 400) {
      const code = config.data?.code || config.statusText;
      const messageInConfig =
        config.data.message || config.data?.error?.message;

      const message =
        typeof messageInConfig === "string"
          ? messageInConfig
          : isArray(messageInConfig)
            ? messageInConfig.find((v) => v) || config.statusText
            : config.statusText || messageInConfig;

      throw new AxiosError(message, code, undefined, undefined, config);
    }

    return config;
  },
  onRejected: (error) => {
    return Promise.reject(error);
  }
};

const axios = new Axios(config);

axios.interceptors.request.use(
  requestInterceptor.onFulfilled,
  requestInterceptor.onRejected
);
axios.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);

//
const curringMethod =
  (method: Method) =>
  async ({
    timeout = MEDIUM_REQUEST_TIMEOUT,
    ...requestConfig
  }: Omit<AxiosRequestConfig, "method">) => {
    return axios
      .request({ ...requestConfig, timeout, method })
      .then((response) => response.data);
  };

// Usually use Method
export const GET = curringMethod("get");
export const POST = curringMethod("post");
export const PUT = curringMethod("put");
export const DELETE = curringMethod("delete");
export const OPTIONS = curringMethod("options");
export const PATCH = curringMethod("patch");
