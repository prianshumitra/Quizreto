import { apiClient } from './client';
import type {
  AttemptHistoryResponse,
  AttemptResponse,
  AttemptStatsResponse,
  AttemptSubmit,
} from '../types/api';

export const startAttempt = async (quizId: number): Promise<AttemptResponse> => {
  const response = await apiClient.post<AttemptResponse>(`/api/quizzes/${quizId}/attempt`);
  return response.data;
};

export const submitAttempt = async (attemptId: number, data: AttemptSubmit): Promise<AttemptResponse> => {
  const response = await apiClient.post<AttemptResponse>(`/api/quizzes/attempts/${attemptId}/submit`, data);
  return response.data;
};

export const getAttempt = async (attemptId: number): Promise<AttemptResponse> => {
  const response = await apiClient.get<AttemptResponse>(`/api/quizzes/attempts/${attemptId}`);
  return response.data;
};

export const getMyAttempts = async (): Promise<AttemptHistoryResponse[]> => {
  const response = await apiClient.get<AttemptHistoryResponse[]>('/api/quizzes/my-attempts');
  return response.data;
};

export const getMyAttemptStats = async (): Promise<AttemptStatsResponse> => {
  const response = await apiClient.get<AttemptStatsResponse>('/api/quizzes/my-attempts/stats');
  return response.data;
};

export const getQuizAttempts = async (quizId: number): Promise<AttemptHistoryResponse[]> => {
  const response = await apiClient.get<AttemptHistoryResponse[]>(`/api/quizzes/${quizId}/attempts`);
  return response.data;
};
