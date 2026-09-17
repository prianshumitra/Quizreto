from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database import get_db
from app.models.attempt import QuizAttempt
from app.models.question import Question
from app.models.quiz import Quiz
from app.models.user import User
from app.schemas.attempt import (
    AttemptHistoryResponse,
    AttemptResponse,
    AttemptStatsResponse,
    AttemptSubmit,
)


router = APIRouter(
    prefix="/api/quizzes",
    tags=["Attempts"]
)


# ---------------------------------------------------------
# USER ATTEMPT HISTORY
# ---------------------------------------------------------

@router.get(
    "/my-attempts",
    response_model=list[AttemptHistoryResponse]
)
def get_my_attempts(
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    attempts = db.scalars(
        select(QuizAttempt)
        .where(
            QuizAttempt.user_id == current_user.id
        )
        .order_by(
            QuizAttempt.id.desc()
        )
    ).all()

    return attempts


# ---------------------------------------------------------
# USER ATTEMPT STATISTICS
# ---------------------------------------------------------

@router.get(
    "/my-attempts/stats",
    response_model=AttemptStatsResponse
)
def get_my_attempt_stats(
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    attempts = db.scalars(
        select(QuizAttempt)
        .where(
            QuizAttempt.user_id == current_user.id
        )
    ).all()

    total_attempts = len(attempts)

    completed_attempts = sum(
        1
        for attempt in attempts
        if attempt.completed
    )

    completed = [
        attempt
        for attempt in attempts
        if attempt.completed
    ]

    if completed:
        average_score = sum(
            attempt.score
            for attempt in completed
        ) / len(completed)

        average_percentage = sum(
            attempt.percentage
            for attempt in completed
        ) / len(completed)

        best_percentage = max(
            attempt.percentage
            for attempt in completed
        )

    else:
        average_score = 0.0
        average_percentage = 0.0
        best_percentage = 0.0

    return {
        "total_attempts": total_attempts,
        "completed_attempts": completed_attempts,
        "average_score": round(average_score, 2),
        "average_percentage": round(average_percentage, 2),
        "best_percentage": round(best_percentage, 2)
    }


# ---------------------------------------------------------
# START QUIZ ATTEMPT
# ---------------------------------------------------------

@router.post(
    "/{quiz_id}/attempt",
    response_model=AttemptResponse,
    status_code=status.HTTP_201_CREATED
)
def start_attempt(
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

    total_questions = db.scalar(
        select(func.count(Question.id))
        .where(
            Question.quiz_id == quiz_id
        )
    )

    new_attempt = QuizAttempt(
        quiz_id=quiz_id,
        user_id=current_user.id,
        score=0,
        percentage=0.0,
        total_questions=total_questions,
        completed=False
    )

    db.add(new_attempt)
    db.commit()
    db.refresh(new_attempt)

    return new_attempt


# ---------------------------------------------------------
# SUBMIT QUIZ ATTEMPT
# ---------------------------------------------------------

@router.post(
    "/attempts/{attempt_id}/submit",
    response_model=AttemptResponse
)
def submit_attempt(
        attempt_id: int,
        submission: AttemptSubmit,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    attempt = db.scalar(
        select(QuizAttempt).where(
            QuizAttempt.id == attempt_id
        )
    )

    if attempt is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Attempt not found"
        )

    if attempt.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This attempt does not belong to you"
        )

    if attempt.completed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Attempt has already been submitted"
        )

    questions = db.scalars(
        select(Question).where(
            Question.quiz_id == attempt.quiz_id
        )
    ).all()

    question_map = {
        question.id: question
        for question in questions
    }

    score = 0

    for answer in submission.answers:
        question = question_map.get(
            answer.question_id
        )

        if question is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Question {answer.question_id} "
                    "does not belong to this quiz"
                )
            )

        if (
                answer.selected_option.upper()
                == question.correct_option.upper()
        ):
            score += 1

    attempt.score = score

    attempt.percentage = (
        (score / attempt.total_questions) * 100
        if attempt.total_questions > 0
        else 0.0
    )

    attempt.completed = True
    attempt.submitted_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(attempt)

    return attempt


# ---------------------------------------------------------
# GET SINGLE ATTEMPT / RESULT
# ---------------------------------------------------------

@router.get(
    "/attempts/{attempt_id}",
    response_model=AttemptResponse
)
def get_attempt(
        attempt_id: int,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    attempt = db.scalar(
        select(QuizAttempt).where(
            QuizAttempt.id == attempt_id
        )
    )

    if attempt is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Attempt not found"
        )

    if attempt.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only view your own attempts"
        )

    return attempt


# ---------------------------------------------------------
# QUIZ ATTEMPT HISTORY
# ---------------------------------------------------------

@router.get(
    "/{quiz_id}/attempts",
    response_model=list[AttemptHistoryResponse]
)
def get_quiz_attempts(
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

    attempts = db.scalars(
        select(QuizAttempt)
        .where(
            QuizAttempt.quiz_id == quiz_id
        )
        .order_by(
            QuizAttempt.id.desc()
        )
    ).all()

    return attempts