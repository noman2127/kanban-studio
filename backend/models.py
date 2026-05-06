from sqlalchemy import Column as SAColumn
from sqlalchemy import Integer, String, Text, DateTime, ForeignKey, func, UniqueConstraint
from sqlalchemy.orm import relationship

from db import Base


class User(Base):
    __tablename__ = "users"

    id = SAColumn(Integer, primary_key=True, index=True)
    username = SAColumn(String, nullable=False, unique=True, index=True)
    created_at = SAColumn(DateTime, server_default=func.datetime("now"), nullable=False)
    updated_at = SAColumn(
        DateTime,
        server_default=func.datetime("now"),
        onupdate=func.datetime("now"),
        nullable=False,
    )

    boards = relationship("Board", back_populates="user", cascade="all, delete-orphan")


class Board(Base):
    __tablename__ = "boards"

    id = SAColumn(Integer, primary_key=True, index=True)
    user_id = SAColumn(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = SAColumn(String, nullable=False)
    created_at = SAColumn(DateTime, server_default=func.datetime("now"), nullable=False)
    updated_at = SAColumn(
        DateTime,
        server_default=func.datetime("now"),
        onupdate=func.datetime("now"),
        nullable=False,
    )

    user = relationship("User", back_populates="boards")
    columns = relationship(
        "Column",
        back_populates="board",
        cascade="all, delete-orphan",
        order_by="Column.position",
    )


class Column(Base):
    __tablename__ = "columns"
    __table_args__ = (
        UniqueConstraint("board_id", "position", name="uq_columns_board_position"),
    )

    id = SAColumn(Integer, primary_key=True, index=True)
    board_id = SAColumn(Integer, ForeignKey("boards.id", ondelete="CASCADE"), nullable=False, index=True)
    title = SAColumn(String, nullable=False)
    position = SAColumn(Integer, nullable=False, default=1)
    created_at = SAColumn(DateTime, server_default=func.datetime("now"), nullable=False)
    updated_at = SAColumn(
        DateTime,
        server_default=func.datetime("now"),
        onupdate=func.datetime("now"),
        nullable=False,
    )

    board = relationship("Board", back_populates="columns")
    cards = relationship(
        "Card",
        back_populates="column",
        cascade="all, delete-orphan",
        order_by="Card.position",
    )


class Card(Base):
    __tablename__ = "cards"
    __table_args__ = (
        UniqueConstraint("column_id", "position", name="uq_cards_column_position"),
    )

    id = SAColumn(Integer, primary_key=True, index=True)
    column_id = SAColumn(Integer, ForeignKey("columns.id", ondelete="CASCADE"), nullable=False, index=True)
    title = SAColumn(String, nullable=False)
    details = SAColumn(Text, nullable=False)
    position = SAColumn(Integer, nullable=False, default=1)
    created_at = SAColumn(DateTime, server_default=func.datetime("now"), nullable=False)
    updated_at = SAColumn(
        DateTime,
        server_default=func.datetime("now"),
        onupdate=func.datetime("now"),
        nullable=False,
    )

    column = relationship("Column", back_populates="cards")
