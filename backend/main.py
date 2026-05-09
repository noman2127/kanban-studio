"""
Entry point for the backend server.
Run with: python main.py
"""

import os
import sys
from pathlib import Path

# Add backend directory to path
BACKEND_DIR = Path(__file__).parent
sys.path.insert(0, str(BACKEND_DIR))

import uvicorn

if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    # Determine host and port
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    
    # Run the server
    uvicorn.run(
        "app:app",
        host=host,
        port=port,
        reload=False,  # Disabled to prevent constant restarts from venv changes
        log_level="info",
    )
