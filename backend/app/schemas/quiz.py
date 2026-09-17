from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class QuizCreate(BaseModel):
    title: str = Field(
        min_length=2,
        max_length=150
    )

    description: str | None = None


class QuizResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str | None
    created_by: int
    created_at: datetime