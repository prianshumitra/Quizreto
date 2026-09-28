import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

import re

load_dotenv()
backend_dir_env = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
if os.path.exists(backend_dir_env):
    load_dotenv(backend_dir_env)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in the environment variables.")

# Automatically translate IPv6 direct Supabase host to IPv4 session pooler for serverless runtimes
if "db.wkhqmdvgrtpvrgkzjnlr.supabase.co" in DATABASE_URL:
    DATABASE_URL = re.sub(
        r'://([^:]+):([^@]+)@db\.([a-zA-Z0-9]+)\.supabase\.co:5432/([^?]+)',
        r'://\1.\3:\2@aws-0-ap-south-1.pooler.supabase.com:5432/\4',
        DATABASE_URL
    )

if ("supabase.co" in DATABASE_URL or "supabase.com" in DATABASE_URL) and "sslmode=" not in DATABASE_URL:
    delimiter = "&" if "?" in DATABASE_URL else "?"
    DATABASE_URL = f"{DATABASE_URL}{delimiter}sslmode=require"

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)


class Base(DeclarativeBase):
    pass


SessionLocal = sessionmaker(
    bind=engine,
    class_=Session,
    autocommit=False,
    autoflush=False
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

