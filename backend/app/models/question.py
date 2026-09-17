from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Question(Base):
    __tablename__ = "questions"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    quiz_id: Mapped[int] = mapped_column(
        ForeignKey("quizzes.id"),
        nullable=False
    )

    question_text: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    option_a: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    option_b: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    option_c: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    option_d: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    correct_option: Mapped[str] = mapped_column(
        String(1),
        nullable=False
    )

    quiz = relationship(
        "Quiz",
        back_populates="questions"
    )