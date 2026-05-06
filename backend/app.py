"""
Project Management MVP Backend
FastAPI application serving frontend and API endpoints
"""

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import os

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

# Mount public assets
if PUBLIC_DIR.exists():
    app.mount("/public", StaticFiles(directory=PUBLIC_DIR), name="public")

# Health check endpoint
@app.get("/api/health")
def health():
    """Health check endpoint for monitoring"""
    return {"status": "ok", "version": "0.1.0"}

# Frontend HTML - serves the Kanban board
@app.get("/")
async def serve_frontend():
    """Serve the frontend index page"""
    index_path = OUT_DIR / "index.html"
    if index_path.exists():
        return FileResponse(index_path, media_type="text/html")
    
    return {"error": "Frontend not built. Run 'npm run build' in frontend directory."}

# Catch-all route for Next.js client-side routing
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    """
    Serve index.html for all non-API routes to support Next.js client-side routing
    """
    # Don't intercept API routes
    if full_path.startswith("api/"):
        return {"error": "Not Found", "path": full_path}, 404
    
    index_path = OUT_DIR / "index.html"
    if index_path.exists():
        return FileResponse(index_path, media_type="text/html")
    
    return {"error": "Frontend not built. Run 'npm run build' in frontend directory."}
