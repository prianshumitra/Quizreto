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
    completed: bool
    submitted_at: datetime | None