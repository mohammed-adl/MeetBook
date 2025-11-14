import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiError } from "@/utils";
import authService from "@/services/authService";

const API_URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3001/api/v1";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const refreshApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

let refreshing: Promise<void> | null = null;

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as ExtendedAxiosRequestConfig;

    if (!config) {
      return Promise.reject(error);
    }

    // Handle 401 - Unauthorized (token expired)
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;

      if (!refreshing) {
        refreshing = (async () => {
          try {
            const body = await authService.callRefreshToken();
            authService.setTokens(body.accessToken, body.refreshToken);
          } catch (err) {
            authService.logout();
            throw err;
          } finally {
            refreshing = null;
          }
        })();
      }

      try {
        await refreshing;
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken)
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(config);
      } catch (err) {
        return Promise.reject(error);
      }
    }

    // Handle 500 - Server Error (retry logic)
    if (
      error.response?.status === 500 &&
      !config.url?.includes("/auth/signup")
    ) {
      config._retryCount = config._retryCount || 0;

      if (config._retryCount < MAX_RETRIES) {
        config._retryCount += 1;
        await delay(RETRY_DELAY * config._retryCount);
        return api(config);
      }
    }

    return Promise.reject(error);
  }
);

interface ReqApiOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export async function reqApi<T = any>(
  url: string,
  options: ReqApiOptions = {}
): Promise<T> {
  const accessToken = localStorage.getItem("accessToken");

  const isMultipart = options.body instanceof FormData;

  const axiosConfig: AxiosRequestConfig = {
    url,
    method: options.method || "GET",
    headers: {
      ...(isMultipart ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    data: options.body || undefined,
    params: options.params || undefined,
    withCredentials: true,
  };

  try {
    const response = await api(axiosConfig);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new ApiError(err.response.data.message, err.response.status);
    }
    throw new ApiError("Something went wrong.", 500);
  }
}
