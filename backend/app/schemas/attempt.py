from datetime import datetime

from pydantic import BaseModel


class AnswerSubmission(BaseModel):
    question_id: int
    selected_option: str


class AttemptSubmit(BaseModel):
    answers: list[AnswerSubmission]


class AttemptResponse(BaseModel):
    id: int
    quiz_id: int
    user_id: int
    score: int
    total_questions: int
    percentage: float
    completed: bool
    submitted_at: datetime | None


class AttemptHistoryResponse(BaseModel):
    id: int
    quiz_id: int
    score: int
    total_questions: int
    percentage: float
    completed: bool
    submitted_at: datetime | None


class AttemptStatsResponse(BaseModel):
    total_attempts: int
    completed_attempts: int
    average_score: float
    average_percentage: float
    best_percentage: float