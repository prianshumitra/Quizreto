import { apiClient } from './client';
import type { TokenResponse, UserResponse } from '../types/api';

export const registerUser = async (data: { name: string; email: string; password: string }): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>('/api/auth/register', data);
  return response.data;
};

export const loginUser = async (email: string, password: string): Promise<TokenResponse> => {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  const response = await apiClient.post<TokenResponse>('/api/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const getMyProfile = async (): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>('/api/auth/me');
  return response.data;
};
