# Backend API Server

Project Management MVP backend built with FastAPI.

## Setup

### Prerequisites
- Python 3.9+
- pip (Python package manager)

### Installation

1. Create a virtual environment (recommended):
```bash
python -m venv venv
```

2. Activate the virtual environment:
   - **Windows**: `venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

### Development Mode
```bash
python main.py
```

The server will start at `http://localhost:8000` with auto-reload on file changes.

### Production Mode
```bash
python -m uvicorn app:app --host 0.0.0.0 --port 8000
```

## Environment Variables

Create a `.env` file in the backend directory:

```
HOST=0.0.0.0
PORT=8000
DEBUG=True
OPENROUTER_API_KEY=your_key_here
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Returns server status

### Frontend
- **GET** `/` - Serves the Kanban board interface

## Frontend Build

The backend serves a statically built Next.js frontend. Before deploying:

1. Build the frontend from the frontend directory:
```bash
cd frontend
npm install
npm run build
```

This creates the `.next/` directory which the backend serves.

2. Restart the backend server to serve the new build.

## Project Structure

```
backend/
├── main.py              # Server entry point
├── app.py               # FastAPI application
├── config.py            # Configuration settings
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (create this)
└── services/            # Service modules (added in later parts)
    └── ai_service.py    # AI integration (Part 7+)
```

## Architecture

### Current State (Part 2)
- ✅ Backend infrastructure set up
- ✅ Frontend served statically at `/`
- ✅ Health check endpoint
- 🔄 Frontend build integration (waiting for npm to complete)
- ⏳ Authentication (Part 3)
- ⏳ Database (Part 5)
- ⏳ AI Features (Part 7+)

## Testing

Currently testing manually via browser. Unit tests will be added in Part 5.

### Manual Testing
1. Start the backend: `python main.py`
2. Open browser to `http://localhost:8000`
3. Verify you see the Kanban board

## Development Notes

- Backend uses FastAPI for the web framework
- Uvicorn for the ASGI server
- Python-dotenv for environment variable management
- Pydantic for configuration management

## Troubleshooting

### Port Already in Use
If port 8000 is in use, specify a different port:
```bash
python -m uvicorn app:app --host 0.0.0.0 --port 8001
```

Or set the PORT environment variable:
```bash
set PORT=8001
python main.py
```

### Frontend Not Displaying
1. Ensure frontend `.next` build directory exists
2. Check that you've run `npm run build` in the frontend directory
3. Restart the backend server
4. Check browser console for errors

## Next Steps

- **Part 3**: Add authentication layer
- **Part 4**: Design database schema
- **Part 5**: Implement API endpoints for data persistence
