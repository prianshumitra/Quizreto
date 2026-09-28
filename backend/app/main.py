import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database import engine
from app.routers.auth import router as auth_router
from app.routers.attempt import router as attempt_router
from app.routers.quiz import router as quiz_router
from app.routers.question import router as question_router


app = FastAPI(
    title="QuizReto API",
    description="Backend API for the QuizReto online quiz and assessment platform.",
    version="1.0.0"
)

cors_origins_env = os.getenv("CORS_ORIGINS", "*")
origins = [origin.strip() for origin in cors_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if "*" not in origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)

# Attempt routes before quiz routes
# so /my-attempts does not get
# interpreted as /{quiz_id}
app.include_router(attempt_router)

app.include_router(quiz_router)
app.include_router(question_router)


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