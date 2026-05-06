from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import SQLAlchemyError

BASE_DIR = Path(__file__).parent
DATABASE_FILE = BASE_DIR / "kanban.db"
DATABASE_URL = f"sqlite:///{DATABASE_FILE}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    future=True,
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    # Import models lazily so Base metadata is populated
    import models  # noqa: F401

    Base.metadata.create_all(bind=engine)
    _seed_database()


def _seed_database():
    from sqlalchemy import select
    from models import User, Board, Column, Card

    with SessionLocal() as session:
        first_user = session.execute(select(User)).scalars().first()
        if first_user:
            return

        user = User(username="user")
        session.add(user)
        session.commit()
        session.refresh(user)

        board = Board(user_id=user.id, title="Kanban Board")
        session.add(board)
        session.commit()
        session.refresh(board)

        column_titles = [
            "Backlog",
            "Discovery",
            "In Progress",
            "Review",
            "Done",
        ]

        columns = []
        for index, title in enumerate(column_titles, start=1):
            column = Column(board_id=board.id, title=title, position=index)
            session.add(column)
            columns.append(column)

        session.commit()

        cards_by_column = [
            [
                ("Align roadmap themes", "Draft quarterly themes with impact statements and metrics."),
                ("Gather customer signals", "Review support tags, sales notes, and churn feedback."),
            ],
            [
                ("Prototype analytics view", "Sketch initial dashboard layout and key drill-downs."),
            ],
            [
                ("Refine status language", "Standardize column labels and tone across the board."),
                ("Design card layout", "Add hierarchy and spacing for scanning dense lists."),
            ],
            [
                ("QA micro-interactions", "Verify hover, focus, and loading states."),
            ],
            [
                ("Ship marketing page", "Final copy approved and asset pack delivered."),
                ("Close onboarding sprint", "Document release notes and share internally."),
            ],
        ]

        for column, cards in zip(columns, cards_by_column):
            for position, (title, details) in enumerate(cards, start=1):
                session.add(
                    Card(
                        column_id=column.id,
                        title=title,
                        details=details,
                        position=position,
                    )
                )

        session.commit()
