from typing import List, Optional
from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AITestRequest(BaseModel):
    prompt: str = "2+2"


class AITestResponse(BaseModel):
    prompt: str
    response_text: str
    model: str
    latency_ms: int
    attempts: int


class CardCreate(BaseModel):
    title: str
    details: str


class CardUpdate(BaseModel):
    title: Optional[str] = None
    details: Optional[str] = None


class MoveCardRequest(BaseModel):
    target_column_id: int
    target_position: Optional[int] = None


class ColumnCreate(BaseModel):
    title: str


class ColumnUpdate(BaseModel):
    title: str


class CardRead(BaseModel):
    id: int
    title: str
    details: str
    position: int

    class Config:
        orm_mode = True


class ColumnRead(BaseModel):
    id: int
    title: str
    position: int
    cards: List[CardRead] = Field(default_factory=list)

    class Config:
        orm_mode = True


class BoardRead(BaseModel):
    id: int
    title: str
    columns: List[ColumnRead] = Field(default_factory=list)

    class Config:
        orm_mode = True
