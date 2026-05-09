"""
Project Management MVP Backend
FastAPI application serving frontend and API endpoints
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

# Create FastAPI app
app = FastAPI(
    title="Project Management MVP",
    description="Backend API and frontend server",
    version="0.1.0",
)

# Get the path to static files (built Next.js frontend)
BASE_DIR = Path(__file__).parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"
OUT_DIR = FRONTEND_DIR / "out"  # Static export output directory
STATIC_DIR = OUT_DIR / "_next" / "static"
PUBLIC_DIR = OUT_DIR / "public"

# Mount static files from Next.js static export
# This serves CSS, JS, and other assets built by Next.js
if STATIC_DIR.exists():
    app.mount("/_next/static", StaticFiles(directory=STATIC_DIR), name="next-static")

# Mount public assets (legacy path)
if PUBLIC_DIR.exists():
    app.mount("/public", StaticFiles(directory=PUBLIC_DIR), name="public")

# Health check endpoint
@app.get("/api/health")
def health():
    """Health check endpoint for monitoring"""
    return {"status": "ok", "version": "0.1.0"}

# Include backend API routes
try:
    from routes import router as api_router
    from db import init_db

    app.include_router(api_router, prefix="/api")

    @app.on_event("startup")
    async def on_startup():
        init_db()
except Exception:
    # Avoid import-time failure during tooling if dependencies are missing
    pass

# Frontend HTML - serves the Kanban board
@app.get("/")
async def serve_frontend():
    """Serve the frontend index page"""
    index_path = OUT_DIR / "index.html"
    if not index_path.exists():
        return {"error": "Frontend not built. Run 'npm run build' in frontend directory."}
    return FileResponse(index_path)


def _resolve_frontend_file(full_path: str) -> Path | None:
    """Resolve a request path to a file in the static Next.js export output."""
    normalized = full_path.strip("/")
    if not normalized:
        candidates = [OUT_DIR / "index.html"]
    else:
        route_path = Path(normalized)
        candidates = [
            OUT_DIR / route_path,
            OUT_DIR / f"{normalized}.html",
            OUT_DIR / route_path / "index.html",
        ]

    out_dir_resolved = OUT_DIR.resolve()
    for candidate in candidates:
        if not candidate.exists() or not candidate.is_file():
            continue
        candidate_resolved = candidate.resolve()
        if out_dir_resolved in candidate_resolved.parents or candidate_resolved == out_dir_resolved:
            return candidate_resolved

    return None

# Catch-all route for Next.js client-side routing
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    """
    Serve index.html for all non-API routes to support Next.js client-side routing
    """
    # Don't intercept API routes
    if full_path.startswith("api/"):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not Found")

    requested_file = _resolve_frontend_file(full_path)
    if requested_file:
        return FileResponse(requested_file)

    not_found_path = OUT_DIR / "_not-found.html"
    if not_found_path.exists():
        return FileResponse(not_found_path, status_code=status.HTTP_404_NOT_FOUND)

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not Found")
