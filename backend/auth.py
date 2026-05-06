from fastapi import Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from db import get_db
from models import User

AUTH_TOKEN = "user-token"


def _unauthorized_exception() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
        headers={"WWW-Authenticate": "Bearer"},
    )


def _get_authorization_token(authorization: str | None = Header(None, alias="Authorization")) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise _unauthorized_exception()

    token = authorization.split(" ", 1)[1].strip()
    if token != AUTH_TOKEN:
        raise _unauthorized_exception()

    return token


def get_current_user(
    token: str = Depends(_get_authorization_token),
    db: Session = Depends(get_db),
) -> User:
    user = db.query(User).filter(User.username == "user").first()
    if not user:
        raise _unauthorized_exception()
    return user


def create_access_token() -> str:
    return AUTH_TOKEN
