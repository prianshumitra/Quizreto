# 🌟 Quizreto — Knowledge Has No Boundaries

> **A modern, full-stack quiz and assessment platform rooted in curiosity, culture, and learning. Designed for curious minds everywhere.**

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat&logo=docker)](https://www.docker.com)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61DAFB?style=flat&logo=react)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/Database-Supabase%20%2F%20Postgres-336791?style=flat&logo=postgresql)](https://supabase.com)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)

---

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Pre-Loaded Default Quizzes](#-pre-loaded-default-quizzes)
- [Local Development Setup](#-local-development-setup)
- [Docker Deployment](#-docker-deployment)
- [Vercel Production Deployment](#-vercel-production-deployment)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [License](#-license)

---

## 🎯 Project Overview

**Quizreto** is an assessment and quiz platform offering users an interactive quiz-taking experience, instant performance evaluations, attempt tracking, and quiz creation tools. 

Built with a curated aesthetic inspired by timeless art and warm Indian palette accents (deep wine, saffron gold, warm cream), Quizreto combines visual excellence with a robust, enterprise-ready Python and React architecture.

---

## ✨ Key Features

- **Dynamic Curated Quizzes**: Instant access to starter assessments across History, Science, Computer Tech, World Geography, and Literature.
- **Dynamic Question Count**: Real-time retrieval of exact question counts from the backend—no static or hardcoded numbers.
- **Interactive Quiz Engine**: Timed/untimed quiz flows with live option selection, progress tracking, and instant score computation.
- **Comprehensive Results & Analytics**: Detailed score breakdowns, percentage calculation, and historical attempt analytics on personal dashboards.
- **Secure Authentication**: User registration and login powered by JWT Bearer tokens and Argon2 password hashing.
- **Quiz Creator Studio**: Intuitive interface for authenticated users to author custom quizzes with multiple-choice questions.
- **Containerized Architecture**: Complete Docker & Docker Compose setup for local replication and multi-cloud portability.
- **Serverless Ready**: Fully configured for single-project monorepo deployment on **Vercel** with **Supabase Cloud PostgreSQL**.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + Custom Palette Tokens
- **Icons & Animation**: [Lucide React](https://lucide.dev) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Routing**: [React Router v7](https://reactrouter.com)
- **HTTP Client**: [Axios](https://axios-http.com) with token interceptors and user-friendly error formatting

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com) (Python 3.11 / 3.12)
- **ASGI Server**: [Uvicorn](https://www.uvicorn.org)
- **ORM & Data Layer**: [SQLAlchemy 2.0](https://www.sqlalchemy.org)
- **Database Migrations**: [Alembic](https://alembic.sqlalchemy.org)
- **Authentication**: `python-jose` (JWT) + `passlib[argon2]`
- **Validation**: [Pydantic v2](https://docs.pydantic.dev)

### Database & Infrastructure
- **Database**: [PostgreSQL 16](https://www.postgresql.org) / [Supabase Cloud](https://supabase.com) (Session Pooler with SSL)
- **Containers**: [Docker](https://www.docker.com) & [Docker Compose](https://docs.docker.com/compose/)
- **Hosting**: [Vercel](https://vercel.com) (Multi-Service Unified Deployment)

---

## 📂 Project Architecture

```text
Quizreto/
├── api/                     # Vercel serverless entrypoint
│   └── index.py             # ASGI bridge to FastAPI backend
├── backend/                 # FastAPI Application
│   ├── alembic/             # Database migration versions
│   ├── app/
│   │   ├── core/            # Security (JWT, Argon2) & dependencies
│   │   ├── models/          # SQLAlchemy ORM models (User, Quiz, Question, Attempt)
│   │   ├── routers/         # API endpoints (auth, quiz, question, attempt)
│   │   ├── schemas/         # Pydantic validation schemas
│   │   ├── services/        # Business logic & starter quiz seeder
│   │   ├── database.py      # Database engine & SessionLocal with IPv4 pooler
│   │   └── main.py          # FastAPI application initialization & middleware
│   ├── Dockerfile           # Backend container definition
│   ├── entrypoint.sh        # Startup script (runs Alembic then Uvicorn)
│   ├── main.py              # Root backend entrypoint
│   └── requirements.txt     # Python backend dependencies
├── frontend/                # React Vite Application
│   ├── src/
│   │   ├── api/             # Axios client & typed API wrappers
│   │   ├── components/      # UI, Quiz, Layout, and Dashboard components
│   │   ├── context/         # AuthContext & state providers
│   │   ├── pages/           # Dashboard, Explore, QuizAttempt, Result, Login, Profile
│   │   └── types/           # TypeScript API interfaces
│   ├── Dockerfile           # Multi-stage frontend container (Node build + Nginx)
│   ├── nginx.conf           # SPA routing fallback & API reverse proxy
│   └── package.json         # NPM scripts and dependencies
├── docker-compose.yml       # 3-tier local container orchestration (DB, API, Web)
├── requirements.txt         # Root Python requirements for Vercel
├── vercel.json              # Vercel Services multi-app deployment config
└── README.md                # Project documentation
```

---

## 📚 Pre-Loaded Default Quizzes

Quizreto seeds starter assessments into the database automatically on startup:

| Quiz Title | Category | Questions | Highlights |
| :--- | :--- | :---: | :--- |
| **Indian Constitution & Polity** | `History` / `Polity` | **5** | Dr. B.R. Ambedkar, Constituent Assembly, Article 32, Fundamental Rights |
| **Wonders of General Science & Astronomy** | `Science` | **5** | Planetary moons, cellular mitochondria, atmospheric nitrogen, speed of light |
| **Core Computer Science & Web Tech** | `Technology` | **5** | HTTP, LIFO stack mechanics, Binary Search Trees, SQL, HTTPS/TLS |
| **World Geography & Natural Wonders** | `Geography` | **5** | Nile River, Canadian lakes, Mount Everest, Vatican City, Gibraltar Strait |
| **Literary Classics & Nobel Laureates** | `Literature` | **5** | Rabindranath Tagore, Shakespeare's Hamlet, Jane Austen, 1984 |

---

## 💻 Local Development Setup

### Prerequisites
- **Python 3.11+**
- **Node.js 20+**
- **PostgreSQL** (local or cloud Supabase)

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv .venv
# On Windows:
.\.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment in backend/.env:
# DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/quizreto
# SECRET_KEY=your_secret_key_here
# ALGORITHM=HS256
# ACCESS_TOKEN_EXPIRE_MINUTES=60

# Run migrations
alembic upgrade head

# Start FastAPI server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
Swagger API docs will be available at: `http://127.0.0.1:8000/docs`

### 2. Frontend Setup
```bash
# In a new terminal, navigate to frontend
cd frontend

# Install packages
npm install

# Start Vite development server
npm run dev
```
Open `http://localhost:5173` in your browser. (The Vite proxy routes `/api/*` to `127.0.0.1:8000` automatically).

---

## 🐳 Docker Deployment

The repository includes a ready-to-run 3-tier architecture with **Docker Compose**:
- **`quizreto-db`**: PostgreSQL 16 Alpine with healthcheck.
- **`quizreto-backend`**: FastAPI application waiting for database readiness and auto-migrating schema.
- **`quizreto-frontend`**: Lightweight Nginx alpine server serving the compiled React bundle and proxying `/api` internally.

```bash
# Start all services
docker compose up -d

# View live container logs
docker compose logs -f

# Stop all services
docker compose down
```

Access the app at:
- Frontend: `http://localhost` (or `http://localhost:5173`)
- Backend API Docs: `http://localhost:8001/docs`

---

## 🚀 Vercel Production Deployment

Quizreto is configured for **Vercel Services**, allowing both the Vite frontend and FastAPI backend to deploy together under one custom domain.

### 1. Database (Supabase)
1. Create a free PostgreSQL project at [Supabase](https://supabase.com).
2. Use the **Session Pooler (IPv4)** URI under **Project Settings > Database > Connection string**:
   ```text
   postgresql+psycopg2://postgres.[project-ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres?sslmode=require
   ```

### 2. Import into Vercel
1. Go to [Vercel](https://vercel.com/new) and import the GitHub repository.
2. Vercel automatically detects the **Services** preset:
   - `frontend` (Vite) at `/`
   - `backend` (FastAPI) at `/api`
3. Add the following **Environment Variables**:
   - `DATABASE_URL`: Your Supabase connection string
   - `SECRET_KEY`: Random 32+ character string
   - `ALGORITHM`: `HS256`
   - `ACCESS_TOKEN_EXPIRE_MINUTES`: `60`
   - `CORS_ORIGINS`: `*`
4. Click **Deploy**. Both the frontend SPA and backend API will deploy live!

---

## 📡 API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and receive JWT access token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes |
| `GET` | `/api/quizzes` | List all quizzes with dynamic question count | No |
| `GET` | `/api/quizzes/{id}` | Get quiz details with questions | No |
| `POST` | `/api/quizzes` | Create a new quiz | Yes |
| `POST` | `/api/questions` | Add question to a quiz | Yes |
| `POST` | `/api/attempts/submit` | Submit answers and receive score/percentage | Yes |
| `GET` | `/api/attempts/my-attempts`| Fetch user's attempt history | Yes |
| `GET` | `/api/attempts/my-stats` | Fetch aggregate stats (average score, total taken) | Yes |
| `GET` | `/health` | Server and database health check | No |

---

## 🔑 Environment Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | SQLAlchemy PostgreSQL connection URI | `postgresql+psycopg2://user:pass@host:5432/db?sslmode=require` |
| `SECRET_KEY` | Secret key used to sign JWT tokens | `your-secret-random-key-32-chars` |
| `ALGORITHM` | Token encoding algorithm (default: HS256) | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration duration in minutes | `60` |
| `CORS_ORIGINS` | Permitted CORS origins (comma-separated or `*`)| `*` |
| `VITE_API_URL` | Frontend API base URL (optional, defaults to `""` for relative)| `https://your-api.com` |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Built with ❤️ for learners, educators, and quiz enthusiasts worldwide.
