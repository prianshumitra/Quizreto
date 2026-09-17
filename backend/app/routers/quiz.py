from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database import get_db
from app.models.quiz import Quiz
from app.models.user import User
from app.schemas.quiz import QuizCreate, QuizResponse


router = APIRouter(
    prefix="/api/quizzes",
    tags=["Quizzes"]
)


@router.post(
    "",
    response_model=QuizResponse,
    status_code=status.HTTP_201_CREATED
)
def create_quiz(
        quiz_data: QuizCreate,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    new_quiz = Quiz(
        title=quiz_data.title,
        description=quiz_data.description,
        created_by=current_user.id
    )

    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz)

    return new_quiz


@router.get(
    "",
    response_model=list[QuizResponse]
)
def get_quizzes(
        db: Session = Depends(get_db)
):
    quizzes = db.scalars(
        select(Quiz).order_by(Quiz.created_at.desc())
    ).all()

    return quizzes


@router.get(
    "/{quiz_id}",
    response_model=QuizResponse
)
def get_quiz(
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

    return quiz


@router.delete(
    "/{quiz_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_quiz(
        quiz_id: int,
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
            detail="You can only delete your own quizzes"
        )

    db.delete(quiz)
    db.commit()

    return None
