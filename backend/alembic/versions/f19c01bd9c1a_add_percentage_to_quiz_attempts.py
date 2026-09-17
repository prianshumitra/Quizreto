"""add percentage to quiz attempts

Revision ID: f19c01bd9c1a
Revises: 9af667604a99
Create Date: 2026-09-17
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "f19c01bd9c1a"
down_revision: Union[str, Sequence[str], None] = "9af667604a99"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "quiz_attempts",
        sa.Column(
            "percentage",
            sa.Float(),
            nullable=False,
            server_default="0.0"
        )
    )

    op.alter_column(
        "quiz_attempts",
        "percentage",
        server_default=None
    )


def downgrade() -> None:
    op.drop_column(
        "quiz_attempts",
        "percentage"
    )