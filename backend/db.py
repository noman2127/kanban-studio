from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

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
    _normalize_board_structure()


def _seed_database():
    from sqlalchemy import select
    from models import Board, Card, Column, User

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


def _normalize_board_structure():
    """
    Keep boards consistent with MVP constraints:
    - fixed five-column board for the MVP
    - no duplicate/extra columns from historical test data
    """
    from sqlalchemy import select
    from models import Board, Card, Column

    with SessionLocal() as session:
        boards = session.execute(select(Board)).scalars().all()
        for board in boards:
            columns = (
                session.query(Column)
                .filter(Column.board_id == board.id)
                .order_by(Column.position.asc(), Column.id.asc())
                .all()
            )
            if not columns:
                continue

            kept_columns = columns[:5]
            extra_columns = columns[5:]

            if extra_columns:
                kept_by_title = {}
                for column in kept_columns:
                    kept_by_title.setdefault(column.title.strip().lower(), column)

                fallback_column = kept_columns[-1]
                for extra in extra_columns:
                    target = kept_by_title.get(extra.title.strip().lower(), fallback_column)
                    cards = (
                        session.query(Card)
                        .filter(Card.column_id == extra.id)
                        .order_by(Card.position.asc(), Card.id.asc())
                        .all()
                    )
                    if cards:
                        max_position = (
                            session.query(Card.position)
                            .filter(Card.column_id == target.id)
                            .order_by(Card.position.desc())
                            .first()
                        )
                        position = (max_position[0] if max_position else 0) + 1
                        for card in cards:
                            card.column_id = target.id
                            card.position = position
                            position += 1
                    session.delete(extra)

                session.flush()

            final_columns = (
                session.query(Column)
                .filter(Column.board_id == board.id)
                .order_by(Column.position.asc(), Column.id.asc())
                .all()
            )
            for index, column in enumerate(final_columns, start=1):
                column.position = index

        session.commit()
