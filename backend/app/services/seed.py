from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.question import Question
from app.models.quiz import Quiz
from app.models.user import User


STARTER_QUIZZES = [
    {
        "title": "Indian Constitution & Polity",
        "description": "Explore the foundations of the Republic of India, fundamental rights, and constitutional history. [History] [Polity]",
        "questions": [
            {
                "question_text": "Who is revered as the 'Father of the Indian Constitution'?",
                "option_a": "Dr. B.R. Ambedkar",
                "option_b": "Mahatma Gandhi",
                "option_c": "Jawaharlal Nehru",
                "option_d": "Sardar Vallabhbhai Patel",
                "correct_option": "A",
            },
            {
                "question_text": "In which year was the Constitution of India formally adopted by the Constituent Assembly?",
                "option_a": "1947",
                "option_b": "1949",
                "option_c": "1950",
                "option_d": "1952",
                "correct_option": "B",
            },
            {
                "question_text": "Which Article of the Indian Constitution was described by Dr. Ambedkar as the 'Heart and Soul of the Constitution'?",
                "option_a": "Article 14",
                "option_b": "Article 21",
                "option_c": "Article 32",
                "option_d": "Article 370",
                "correct_option": "C",
            },
            {
                "question_text": "The concept of Fundamental Rights in the Indian Constitution was inspired by the constitution of which country?",
                "option_a": "United States",
                "option_b": "United Kingdom",
                "option_c": "USSR",
                "option_d": "France",
                "correct_option": "A",
            },
            {
                "question_text": "How many schedules were there originally in the Indian Constitution at the time of adoption?",
                "option_a": "8",
                "option_b": "10",
                "option_c": "12",
                "option_d": "14",
                "correct_option": "A",
            },
        ],
    },
    {
        "title": "Wonders of General Science & Astronomy",
        "description": "Discover fascinating principles of physics, biology, chemistry, and celestial cosmos. [Science]",
        "questions": [
            {
                "question_text": "Which planet in our Solar System has the highest number of confirmed moons?",
                "option_a": "Jupiter",
                "option_b": "Saturn",
                "option_c": "Uranus",
                "option_d": "Neptune",
                "correct_option": "B",
            },
            {
                "question_text": "What is the powerhouse organelle of the eukaryotic cell responsible for ATP production?",
                "option_a": "Ribosome",
                "option_b": "Golgi apparatus",
                "option_c": "Mitochondria",
                "option_d": "Endoplasmic Reticulum",
                "correct_option": "C",
            },
            {
                "question_text": "What is the most abundant element in the Earth's atmosphere by volume?",
                "option_a": "Oxygen",
                "option_b": "Carbon Dioxide",
                "option_c": "Nitrogen",
                "option_d": "Argon",
                "correct_option": "C",
            },
            {
                "question_text": "Which chemical element is represented by the atomic symbol 'Au'?",
                "option_a": "Silver",
                "option_b": "Gold",
                "option_c": "Copper",
                "option_d": "Aluminum",
                "correct_option": "B",
            },
            {
                "question_text": "Approximately what is the speed of light traveling in a vacuum?",
                "option_a": "300,000 km/s",
                "option_b": "150,000 km/s",
                "option_c": "30,000 km/s",
                "option_d": "3,000 km/s",
                "correct_option": "A",
            },
        ],
    },
    {
        "title": "Core Computer Science & Web Tech",
        "description": "Challenge your understanding of core algorithms, data structures, and web architecture. [Technology]",
        "questions": [
            {
                "question_text": "What does the acronym HTTP stand for in networking?",
                "option_a": "HyperText Transfer Protocol",
                "option_b": "HyperTransfer Text Protocol",
                "option_c": "High Transfer Tech Protocol",
                "option_d": "HyperText Transmission Program",
                "correct_option": "A",
            },
            {
                "question_text": "Which classic data structure operates strictly on a Last-In, First-Out (LIFO) order?",
                "option_a": "Queue",
                "option_b": "Array",
                "option_c": "Stack",
                "option_d": "Linked List",
                "correct_option": "C",
            },
            {
                "question_text": "What is the average time complexity for searching an element in a balanced Binary Search Tree (BST)?",
                "option_a": "O(1)",
                "option_b": "O(n)",
                "option_c": "O(log n)",
                "option_d": "O(n log n)",
                "correct_option": "C",
            },
            {
                "question_text": "In relational database systems, what does the abbreviation SQL stand for?",
                "option_a": "Standard Query Language",
                "option_b": "Structured Query Language",
                "option_c": "Sequential Query Logic",
                "option_d": "System Query Layer",
                "correct_option": "B",
            },
            {
                "question_text": "Which cryptographic protocol is modernly used to secure HTTP web communications over TLS?",
                "option_a": "FTP",
                "option_b": "HTTPS",
                "option_c": "SMTP",
                "option_d": "Telnet",
                "correct_option": "B",
            },
        ],
    },
    {
        "title": "World Geography & Natural Wonders",
        "description": "Traverse the globe through continents, mighty rivers, mountain summits, and global oceans. [Geography]",
        "questions": [
            {
                "question_text": "Which river is widely recognized as the longest river in the world?",
                "option_a": "Amazon River",
                "option_b": "Nile River",
                "option_c": "Yangtze River",
                "option_d": "Mississippi River",
                "correct_option": "B",
            },
            {
                "question_text": "Which country possesses the largest number of natural freshwater lakes in the world?",
                "option_a": "Canada",
                "option_b": "Russia",
                "option_c": "United States",
                "option_d": "Finland",
                "correct_option": "A",
            },
            {
                "question_text": "Mount Everest is situated along the international border of Nepal and which territory?",
                "option_a": "India",
                "option_b": "Bhutan",
                "option_c": "Tibet (China)",
                "option_d": "Myanmar",
                "correct_option": "C",
            },
            {
                "question_text": "What is the smallest independent sovereign state in the world by both area and population?",
                "option_a": "Monaco",
                "option_b": "San Marino",
                "option_c": "Vatican City",
                "option_d": "Liechtenstein",
                "correct_option": "C",
            },
            {
                "question_text": "The Strait of Gibraltar connects the Atlantic Ocean directly to which sea?",
                "option_a": "Red Sea",
                "option_b": "Mediterranean Sea",
                "option_c": "Baltic Sea",
                "option_d": "Black Sea",
                "correct_option": "B",
            },
        ],
    },
    {
        "title": "Literary Classics & Nobel Laureates",
        "description": "Celebrate famous authors, timeless literary masterworks, and world poetry. [Literature]",
        "questions": [
            {
                "question_text": "Who was the first non-European to be awarded the Nobel Prize in Literature in 1913?",
                "option_a": "Rabindranath Tagore",
                "option_b": "R.K. Narayan",
                "option_c": "Sarojini Naidu",
                "option_d": "Munshi Premchand",
                "correct_option": "A",
            },
            {
                "question_text": "In which Shakespearean tragedy does the famous soliloquy beginning 'To be, or not to be' appear?",
                "option_a": "Macbeth",
                "option_b": "Hamlet",
                "option_c": "Othello",
                "option_d": "King Lear",
                "correct_option": "B",
            },
            {
                "question_text": "Which English author penned the celebrated 1813 romance novel 'Pride and Prejudice'?",
                "option_a": "Charlotte Brontë",
                "option_b": "Mary Shelley",
                "option_c": "Jane Austen",
                "option_d": "Emily Dickinson",
                "correct_option": "C",
            },
            {
                "question_text": "The great ancient Indian epic 'Mahabharata' is traditionally attributed to which sage?",
                "option_a": "Valmiki",
                "option_b": "Vyasa",
                "option_c": "Kalidasa",
                "option_d": "Tulsidas",
                "correct_option": "B",
            },
            {
                "question_text": "Which prophetic dystopian novel depicting 'Big Brother' was authored by George Orwell in 1949?",
                "option_a": "Brave New World",
                "option_b": "Fahrenheit 451",
                "option_c": "1984",
                "option_d": "Animal Farm",
                "correct_option": "C",
            },
        ],
    },
]


def seed_default_quizzes(db: Session) -> list[Quiz]:
    """
    Seeds default starter quizzes into the database if not already present.
    Ensures every user has engaging quizzes to explore immediately.
    """
    # 1. Get or create a dedicated system/official curator user
    admin_user = db.scalar(
        select(User).where(User.email == "official@quizreto.com")
    )
    if not admin_user:
        # Fall back to first available user if present
        first_user = db.scalar(select(User).order_by(User.id.asc()))
        if first_user:
            admin_user = first_user
        else:
            admin_user = User(
                name="Quizreto Official",
                email="official@quizreto.com",
                password_hash=hash_password("QuizretoSystemAdmin2026!"),
                role="admin",
            )
            db.add(admin_user)
            db.commit()
            db.refresh(admin_user)

    created_quizzes: list[Quiz] = []

    for quiz_item in STARTER_QUIZZES:
        # Check if quiz already exists by title
        existing = db.scalar(
            select(Quiz).where(Quiz.title == quiz_item["title"])
        )
        if existing:
            continue

        quiz = Quiz(
            title=quiz_item["title"],
            description=quiz_item["description"],
            created_by=admin_user.id,
        )
        db.add(quiz)
        db.commit()
        db.refresh(quiz)

        for q_data in quiz_item["questions"]:
            question = Question(
                quiz_id=quiz.id,
                question_text=q_data["question_text"],
                option_a=q_data["option_a"],
                option_b=q_data["option_b"],
                option_c=q_data["option_c"],
                option_d=q_data["option_d"],
                correct_option=q_data["correct_option"],
            )
            db.add(question)

        db.commit()
        created_quizzes.append(quiz)

    return created_quizzes
