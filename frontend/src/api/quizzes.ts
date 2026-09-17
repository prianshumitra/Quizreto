import { apiClient } from './client';
import type { QuizCreate, QuizResponse } from '../types/api';

export const getQuizzes = async (): Promise<QuizResponse[]> => {
  const response = await apiClient.get<QuizResponse[]>('/api/quizzes');
  return response.data;
};

export const getQuiz = async (quizId: number): Promise<QuizResponse> => {
  const response = await apiClient.get<QuizResponse>(`/api/quizzes/${quizId}`);
  return response.data;
};

export const createQuiz = async (data: QuizCreate): Promise<QuizResponse> => {
  const response = await apiClient.post<QuizResponse>('/api/quizzes', data);
  return response.data;
};

export const deleteQuiz = async (quizId: number): Promise<void> => {
  await apiClient.delete(`/api/quizzes/${quizId}`);
};
