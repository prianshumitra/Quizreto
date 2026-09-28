#!/bin/sh
set -e

echo "Running Alembic database migrations..."
alembic upgrade head

echo "Starting QuizReto FastAPI application..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
