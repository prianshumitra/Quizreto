import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to attach Authorization Bearer Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('quizreto_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor for user-friendly Error Formatting
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ detail?: string | { msg: string }[] }>) => {
    let userMessage = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      const status = error.response.status;
      const detail = error.response.data?.detail;

      if (typeof detail === 'string') {
        userMessage = detail;
      } else if (Array.isArray(detail) && detail.length > 0) {
        userMessage = detail.map((d) => d.msg).join(', ');
      } else {
        switch (status) {
          case 401:
            userMessage = 'Your session has expired. Please log in again.';
            localStorage.removeItem('quizreto_token');
            break;
          case 403:
            userMessage = 'You do not have permission to perform this action.';
            break;
          case 404:
            userMessage = 'The requested resource was not found.';
            break;
          case 409:
            userMessage = 'This email or record already exists.';
            break;
          case 422:
            userMessage = 'Invalid data submitted. Please check your inputs.';
            break;
          case 500:
            userMessage = 'Server error. Please try again later.';
            break;
          default:
            userMessage = `Request failed with status ${status}`;
        }
      }
    } else if (error.request) {
      userMessage = 'Unable to connect to the backend server. Please make sure the FastAPI server is running on http://127.0.0.1:8000.';
    }

    return Promise.reject(new Error(userMessage));
  }
);
