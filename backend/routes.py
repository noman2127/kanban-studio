from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from auth import create_access_token, get_current_user
from db import get_db
from models import Board, Column, Card
from schemas import (
    BoardRead,
    CardCreate,
    CardUpdate,
    ColumnCreate,
    ColumnRead,
    ColumnUpdate,
    LoginRequest,
    MoveCardRequest,
    TokenResponse,
)

router = APIRouter()


@router.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    if payload.username != "user" or payload.password != "password":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token()
    return {"access_token": token, "token_type": "bearer"}


def _get_board(db: Session, board_id: int, user_id: int) -> Board | None:
    return (
        db.query(Board)
        .filter(Board.id == board_id, Board.user_id == user_id)
        .first()
    )


def _get_column(db: Session, column_id: int, board_id: int) -> Column | None:
    return (
        db.query(Column)
        .filter(Column.id == column_id, Column.board_id == board_id)
        .first()
    )


def _get_card(db: Session, card_id: int, board_id: int) -> Card | None:
    return (
        db.query(Card)
        .join(Column)
        .filter(Card.id == card_id, Column.board_id == board_id)
        .first()
    )


def _build_board_response(board: Board) -> BoardRead:
    return BoardRead(
        id=board.id,
        title=board.title,
        columns=[
            {
                "id": column.id,
                "title": column.title,
                "position": column.position,
                "cards": [
                    {
                        "id": card.id,
                        "title": card.title,
                        "details": card.details,
                        "position": card.position,
                    }
                    for card in sorted(column.cards, key=lambda card: card.position)
                ],
            }
            for column in sorted(board.columns, key=lambda column: column.position)
        ],
    )


@router.get("/boards/{board_id}", response_model=BoardRead)
def read_board(
    board_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    board = _get_board(db, board_id, current_user.id)
    if not board:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Board not found")
    return _build_board_response(board)


@router.post("/boards/{board_id}/columns", response_model=ColumnRead)
def create_column(
    board_id: int,
    payload: ColumnCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    board = _get_board(db, board_id, current_user.id)
    if not board:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Board not found")

    max_position = (
        db.query(Column.position)
        .filter(Column.board_id == board_id)
        .order_by(Column.position.desc())
        .first()
    )
    position = (max_position[0] if max_position else 0) + 1

    column = Column(board_id=board_id, title=payload.title, position=position)
    db.add(column)
    db.commit()
    db.refresh(column)
    return {
        "id": column.id,
        "title": column.title,
        "position": column.position,
        "cards": [],
    }


@router.put("/boards/{board_id}/columns/{column_id}")
def update_column(
    board_id: int,
    column_id: int,
    payload: ColumnUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    column = _get_column(db, column_id, board_id)
    if not column:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Column not found")
    column.title = payload.title
    db.commit()
    return {"id": column.id, "title": column.title}


@router.post("/boards/{board_id}/columns/{column_id}/cards")
def create_card(
    board_id: int,
    column_id: int,
    payload: CardCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    column = _get_column(db, column_id, board_id)
    if not column:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Column not found")

    max_position = (
        db.query(Card.position)
        .filter(Card.column_id == column_id)
        .order_by(Card.position.desc())
        .first()
    )
    position = (max_position[0] if max_position else 0) + 1

    card = Card(
        column_id=column.id,
        title=payload.title,
        details=payload.details,
        position=position,
    )
    db.add(card)
    db.commit()
    db.refresh(card)
    return {"id": card.id, "title": card.title, "details": card.details, "position": card.position}


@router.put("/boards/{board_id}/cards/{card_id}")
def update_card(
    board_id: int,
    card_id: int,
    payload: CardUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    card = _get_card(db, card_id, board_id)
    if not card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")

    if payload.title is not None:
        card.title = payload.title
    if payload.details is not None:
        card.details = payload.details

    db.commit()
    return {"id": card.id, "title": card.title, "details": card.details, "position": card.position}


@router.delete("/boards/{board_id}/cards/{card_id}")
def delete_card(
    board_id: int,
    card_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    card = _get_card(db, card_id, board_id)
    if not card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")

    source_column_id = card.column_id
    db.delete(card)
    db.commit()

    cards = (
        db.query(Card)
        .filter(Card.column_id == source_column_id)
        .order_by(Card.position)
        .all()
    )
    for index, item in enumerate(cards, start=1):
        item.position = index
    db.commit()

    return {"detail": "Card deleted"}


@router.put("/boards/{board_id}/cards/{card_id}/move")
def move_card(
    board_id: int,
    card_id: int,
    payload: MoveCardRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    card = _get_card(db, card_id, board_id)
    if not card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")

    target_column = _get_column(db, payload.target_column_id, board_id)
    if not target_column:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Target column not found")

    if payload.target_position is None:
        max_position = (
            db.query(Card.position)
            .filter(Card.column_id == target_column.id)
            .order_by(Card.position.desc())
            .first()
        )
        payload.target_position = (max_position[0] if max_position else 0) + 1

    if payload.target_position < 1:
        payload.target_position = 1

    if card.column_id == target_column.id:
        cards = (
            db.query(Card)
            .filter(Card.column_id == target_column.id)
            .order_by(Card.position)
            .all()
        )
        cards = [c for c in cards if c.id != card.id]
        cards.insert(min(payload.target_position - 1, len(cards)), card)
        for position, item in enumerate(cards, start=1):
            item.position = position
        db.commit()
        return {"detail": "Card moved"}

    source_cards = (
        db.query(Card)
        .filter(Card.column_id == card.column_id, Card.id != card.id)
        .order_by(Card.position)
        .all()
    )
    for position, item in enumerate(source_cards, start=1):
        item.position = position

    dest_cards = (
        db.query(Card)
        .filter(Card.column_id == target_column.id)
        .order_by(Card.position)
        .all()
    )
    insert_position = min(payload.target_position, len(dest_cards) + 1)
    for item in dest_cards:
        if item.position >= insert_position:
            item.position += 1

    card.column_id = target_column.id
    card.position = insert_position
    db.commit()
    return {"detail": "Card moved"}
