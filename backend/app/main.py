from fastapi import FastAPI
from sqlalchemy import text

from app.database import engine


app = FastAPI(
    title="QuizReto API",
    description="Backend API for the QuizReto online quiz and assessment platform.",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to QuizReto API"
    }


@app.get("/health")
def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception:
        return {
            "status": "unhealthy",
            "database": "disconnected"
        }
