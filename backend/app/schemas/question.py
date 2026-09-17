from pydantic import BaseModel, Field


class QuestionCreate(BaseModel):
    question_text: str = Field(
        min_length=1,
        max_length=2000
    )

    option_a: str = Field(
        min_length=1,
        max_length=500
    )

    option_b: str = Field(
        min_length=1,
        max_length=500
    )

    option_c: str = Field(
        min_length=1,
        max_length=500
    )

    option_d: str = Field(
        min_length=1,
        max_length=500
    )

    correct_option: str = Field(
        pattern="^[ABCD]$"
    )


class QuestionResponse(BaseModel):
    id: int
    quiz_id: int
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str