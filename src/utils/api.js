import axios from "axios";
import { toast } from "react-toastify";

const BaseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BaseURL,
});

// Intercept request to add the access token in the headers
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Intercept response to handle token expiration
api.interceptors.response.use(
  (response) => response, // return response if successful
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // Check if the error is because of an expired token
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          const response = await axios.post(
            `${BaseURL}/api/v1/auth/token/refresh/`,
            { refresh: refreshToken }
          );

          // Save the new access token to local storage
          const newAccessToken = response.data.access;
          localStorage.setItem("accessToken", newAccessToken);

          // Update the Authorization header and retry the original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refreshing the token fails, log the user out
        console.error("Token refresh failed:", refreshError);
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Redirect to the login page
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
