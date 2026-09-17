from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database import get_db
from app.models.question import Question
from app.models.quiz import Quiz
from app.models.user import User
from app.schemas.question import QuestionCreate, QuestionResponse


router = APIRouter(
    prefix="/api/quizzes",
    tags=["Questions"]
)


@router.post(
    "/{quiz_id}/questions",
    response_model=QuestionResponse,
    status_code=status.HTTP_201_CREATED
)
def create_question(
        quiz_id: int,
        question_data: QuestionCreate,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    quiz = db.scalar(
        select(Quiz).where(
            Quiz.id == quiz_id
        )
    )

    if quiz is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quiz not found"
        )

    if quiz.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only add questions to your own quizzes"
        )

    new_question = Question(
        quiz_id=quiz_id,
        question_text=question_data.question_text,
        option_a=question_data.option_a,
        option_b=question_data.option_b,
        option_c=question_data.option_c,
        option_d=question_data.option_d,
        correct_option=question_data.correct_option
    )

    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return new_question


@router.get(
    "/{quiz_id}/questions",
    response_model=list[QuestionResponse]
)
def get_questions(
        quiz_id: int,
        db: Session = Depends(get_db)
):
    quiz = db.scalar(
        select(Quiz).where(
            Quiz.id == quiz_id
        )
    )

    if quiz is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quiz not found"
        )

    questions = db.scalars(
        select(Question).where(
            Question.quiz_id == quiz_id
        ).order_by(Question.id)
    ).all()

    return questions


@router.delete(
    "/questions/{question_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_question(
        question_id: int,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    question = db.scalar(
        select(Question).where(
            Question.id == question_id
        )
    )

    if question is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question not found"
        )

    quiz = db.scalar(
        select(Quiz).where(
            Quiz.id == question.quiz_id
        )
    )

    if quiz.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete questions from your own quizzes"
        )

    db.delete(question)
    db.commit()

    return None