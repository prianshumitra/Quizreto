import { apiClient } from './client';
import type { QuestionCreate, QuestionResponse } from '../types/api';

export const getQuestions = async (quizId: number): Promise<QuestionResponse[]> => {
  const response = await apiClient.get<QuestionResponse[]>(`/api/quizzes/${quizId}/questions`);
  return response.data;
};

export const createQuestion = async (quizId: number, data: QuestionCreate): Promise<QuestionResponse> => {
  const response = await apiClient.post<QuestionResponse>(`/api/quizzes/${quizId}/questions`, data);
  return response.data;
};

export const deleteQuestion = async (questionId: number): Promise<void> => {
  await apiClient.delete(`/api/quizzes/questions/${questionId}`);
};
