import axios from "axios";
import { BackEnd_Base_URL } from "../services/constants/applicationConstants";
import AuthService from "../services/AuthService";
import { handleSessionClear } from "../utils/authUtils";

const axiosInstance = axios.create({
  // baseURL: BackEnd_Base_URL
});

// Variable to track refresh token request status and store pending requests
let isRefreshing = false;
let pendingRequests = [];

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const data = await AuthService.refreshToken(refreshToken);
    if (!data) {
      throw new Error(data?.data?.errorMessage || "Custom Error Occured");
    }

    localStorage.setItem("accessTokenExpiry", data?.tokens?.accessToken_exp);
    localStorage.setItem("refreshTokenExpiry", data?.tokens?.refreshToken_exp);
    localStorage.setItem("tokenSetTime", Date.now());

    const accessToken = data?.tokens?.accessToken;
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken", data?.tokens?.refreshToken);
    }

    const tokenExpiryTime = Date.now() + data?.tokens?.accessToken_exp * 60 * 1000;
    localStorage.setItem("tokenExpiryTime", tokenExpiryTime);

    // Resolve all pending requests with the new access token
    pendingRequests.forEach((callback) => callback(accessToken));
    pendingRequests = [];

    return accessToken;
  } catch (error) {
    console.error("Token refresh failed", error);
    handleSessionClear();
    window.location.href = "/login";
  } finally {
    isRefreshing = false;
  }
};

const isTokenExpired = (tokenExpiryTime) => {
  return Date.now() > tokenExpiryTime;
};

axiosInstance.interceptors.request.use(
  async (request) => {
    let accessToken = localStorage.getItem("accessToken") || null;
    const tokenExpiryTime = localStorage.getItem("tokenExpiryTime") || null;

    if (accessToken) {
      // Handling Token refresh within request
      if (tokenExpiryTime && isTokenExpired(tokenExpiryTime)) {
        if (!isRefreshing) {
          isRefreshing = true;
          accessToken = await refreshAccessToken();
        } else {
          // Wait until the token refresh process is complete
          return new Promise((resolve, reject) => {
            pendingRequests.push((newAccessToken) => {
              request.headers["Authorization"] = `Bearer ${newAccessToken}`;
              resolve(request);
            });
          });
        }
      }
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401) {
      handleSessionClear();
      window.location.href = "/login";
    }

    if (error?.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          // Add the request to the pending requests queue
          pendingRequests.push((accessToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        handleSessionClear();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Abortable request scope
 * -----------------------
 * Any request created (synchronously) inside runWithAbortSignal() gets the given AbortSignal attached,
 * so the caller can cancel it without the service/screen code passing the signal manually.
 * Used by AutoCompleteDropdown to cancel the previous search API call when a new one starts.
 *    - A cancelled request's promise never settles, so the screen's then/catch/finally won't run
 *      for it (no stale data set, no error toast). The newer request handles loading states.
 *    - Requests made outside this scope are not affected.
 */
let activeAbortSignal = null;

export const runWithAbortSignal = (signal, callback) => {
  const previousSignal = activeAbortSignal;
  activeAbortSignal = signal;
  try {
    return callback();
  } finally {
    activeAbortSignal = previousSignal;
  }
};

const attachActiveAbortSignal = (method, configIndex) => {
  const originalMethod = axiosInstance[method];
  axiosInstance[method] = (...args) => {
    const config = args[configIndex] || {};
    // Not inside a scope, or a signal is already passed by the caller
    if (!activeAbortSignal || config.signal) return originalMethod(...args);

    args[configIndex] = { ...config, signal: activeAbortSignal };
    return originalMethod(...args).catch((error) => {
      if (axios.isCancel(error)) return new Promise(() => {});
      return Promise.reject(error);
    });
  };
};

["get", "delete", "head", "options"].forEach((method) => attachActiveAbortSignal(method, 1));
["post", "put", "patch"].forEach((method) => attachActiveAbortSignal(method, 2));
attachActiveAbortSignal("request", 0);

export { axiosInstance as axios };
