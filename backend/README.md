# Backend API Server

FastAPI backend for the Project Management MVP. It serves API routes and the statically exported Next.js frontend.

## Setup

1. Create and activate a virtual environment (recommended)
2. Install dependencies:

```bash
pip install -r requirements.txt
```

## Run

From `backend/`:

```bash
python main.py
```

Server URL: `http://127.0.0.1:8000`

## Frontend Build

The backend serves files from `frontend/out`. Build frontend before running production-like flow:

```bash
cd frontend
npm install
npm run build
```

## API

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/boards/{board_id}`
- `POST /api/boards/{board_id}/columns/{column_id}/cards`
- `PUT /api/boards/{board_id}/cards/{card_id}`
- `PUT /api/boards/{board_id}/cards/{card_id}/move`
- `DELETE /api/boards/{board_id}/cards/{card_id}`
- `POST /api/ai/test`

## Notes

- SQLite DB file: `backend/kanban.db` (auto-created at startup)
- Demo login: `user` / `password`
- AI uses OpenRouter chat completions with model `openai/gpt-oss-120b:free` by default
- Required env var: `OPENROUTER_API_KEY`
- Optional env var override: `OPENROUTER_MODEL`
