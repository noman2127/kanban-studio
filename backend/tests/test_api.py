import os
import sys
from pathlib import Path

from fastapi.testclient import TestClient

# Reset database file before importing backend modules
backend_dir = Path(__file__).parent.parent
db_file = backend_dir / "kanban.db"
if db_file.exists():
    db_file.unlink()

sys.path.insert(0, str(backend_dir))

from app import app
from db import init_db

# Initialize database before running tests
init_db()

client = TestClient(app)
AUTH_HEADER = {"Authorization": "Bearer user-token"}


def test_login_returns_access_token():
    response = client.post("/api/auth/login", json={"username": "user", "password": "password"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["access_token"] == "user-token"
    assert payload["token_type"] == "bearer"


def test_login_with_invalid_credentials_returns_401():
    response = client.post("/api/auth/login", json={"username": "user", "password": "wrong"})
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid username or password"


def test_get_board_requires_authorization():
    response = client.get("/api/boards/1")
    assert response.status_code == 401


def test_get_board_returns_board_data():
    response = client.get("/api/boards/1", headers=AUTH_HEADER)
    assert response.status_code == 200
    payload = response.json()
    assert payload["id"] == 1
    assert payload["title"] == "Kanban Board"
    assert isinstance(payload["columns"], list)
    assert payload["columns"][0]["cards"]


def test_create_and_update_column():
    create_response = client.post(
        "/api/boards/1/columns",
        headers=AUTH_HEADER,
        json={"title": "In Review"},
    )
    assert create_response.status_code == 200
    column_payload = create_response.json()
    assert column_payload["title"] == "In Review"
    column_id = column_payload["id"]

    update_response = client.put(
        f"/api/boards/1/columns/{column_id}",
        headers=AUTH_HEADER,
        json={"title": "Review"},
    )
    assert update_response.status_code == 200
    assert update_response.json()["title"] == "Review"


def test_create_update_move_and_delete_card():
    board_response = client.get("/api/boards/1", headers=AUTH_HEADER)
    assert board_response.status_code == 200
    board = board_response.json()
    first_column_id = board["columns"][0]["id"]
    second_column_id = board["columns"][1]["id"]

    create_response = client.post(
        f"/api/boards/1/columns/{first_column_id}/cards",
        headers=AUTH_HEADER,
        json={"title": "Test Card", "details": "Test details."},
    )
    assert create_response.status_code == 200
    card_payload = create_response.json()
    assert card_payload["title"] == "Test Card"
    card_id = card_payload["id"]

    update_response = client.put(
        f"/api/boards/1/cards/{card_id}",
        headers=AUTH_HEADER,
        json={"title": "Updated Card", "details": "Updated details."},
    )
    assert update_response.status_code == 200
    updated = update_response.json()
    assert updated["title"] == "Updated Card"
    assert updated["details"] == "Updated details."

    move_response = client.put(
        f"/api/boards/1/cards/{card_id}/move",
        headers=AUTH_HEADER,
        json={"target_column_id": second_column_id, "target_position": 1},
    )
    assert move_response.status_code == 200
    assert move_response.json()["detail"] == "Card moved"

    board_after_move = client.get("/api/boards/1", headers=AUTH_HEADER).json()
    moved_column = next(
        column for column in board_after_move["columns"] if column["id"] == second_column_id
    )
    assert any(card["id"] == card_id for card in moved_column["cards"])

    delete_response = client.delete(
        f"/api/boards/1/cards/{card_id}",
        headers=AUTH_HEADER,
    )
    assert delete_response.status_code == 200
    assert delete_response.json()["detail"] == "Card deleted"

    board_after_delete = client.get("/api/boards/1", headers=AUTH_HEADER).json()
    assert not any(
        card["id"] == card_id
        for column in board_after_delete["columns"]
        for card in column["cards"]
    )
