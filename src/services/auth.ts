import { fetchApi, ApiResponse } from '@/utils/api';

// Function to verify email
export const verifyEmail = (token: string): Promise<ApiResponse<{ message: string }>> => {
  return fetchApi<{ message: string }>(`/auth/verify-email?token=${token}`);
};

// Function to set credentials
export const setCredentials = (token: string, username: string, password: string): Promise<ApiResponse<{ message: string }>> => {
  return fetchApi<{ message: string }>('/auth/set-credentials', {
    method: 'POST',
    data: { token, username, password },
  });
};

// Function to register a user (example function)
export const registerUser = (email: string): Promise<ApiResponse<{ message: string }>> => {
  return fetchApi<{ message: string }>('/auth/register', {
    method: 'POST',
    data: { email },
  });
};