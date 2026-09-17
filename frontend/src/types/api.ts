export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface QuizResponse {
  id: number;
  title: string;
  description: string | null;
  created_by: number;
  created_at: string;
  // Optional enriched fields for UI
  category?: string;
  questions_count?: number;
  rating?: number;
}

export interface QuizCreate {
  title: string;
  description?: string;
}

export interface QuestionResponse {
  id: number;
  quiz_id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

export interface QuestionCreate {
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
}

export interface AnswerSubmission {
  question_id: number;
  selected_option: string;
}

export interface AttemptSubmit {
  answers: AnswerSubmission[];
}

export interface AttemptResponse {
  id: number;
  quiz_id: number;
  user_id: number;
  score: number;
  total_questions: number;
  percentage: number;
  completed: boolean;
  submitted_at: string | null;
}

export interface AttemptHistoryResponse {
  id: number;
  quiz_id: number;
  score: number;
  total_questions: number;
  percentage: number;
  completed: boolean;
  submitted_at: string | null;
  quiz_title?: string;
}

export interface AttemptStatsResponse {
  total_attempts: number;
  completed_attempts: number;
  average_score: number;
  average_percentage: number;
  best_percentage: number;
}
