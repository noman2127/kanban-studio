import logging
import os
import time
from dataclasses import dataclass
from typing import Any

import httpx

logger = logging.getLogger(__name__)

OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions"
DEFAULT_MODEL = "openai/gpt-oss-120b:free"
DEFAULT_TIMEOUT_SECONDS = 30.0
DEFAULT_MAX_RETRIES = 2
RETRYABLE_STATUS_CODES = {429, 500, 502, 503, 504}


class AIServiceError(Exception):
    def __init__(self, detail: str, status_code: int = 502):
        super().__init__(detail)
        self.detail = detail
        self.status_code = status_code


@dataclass
class AITestResult:
    prompt: str
    response_text: str
    model: str
    latency_ms: int
    attempts: int


def _extract_response_text(payload: dict[str, Any]) -> str:
    choices = payload.get("choices")
    if not choices or not isinstance(choices, list):
        raise AIServiceError("Invalid OpenRouter response payload.")

    message = choices[0].get("message", {})
    content = message.get("content")
    if isinstance(content, str):
        text = content.strip()
        if text:
            return text
    elif isinstance(content, list):
        parts: list[str] = []
        for item in content:
            if isinstance(item, dict) and item.get("type") == "text":
                value = str(item.get("text", "")).strip()
                if value:
                    parts.append(value)
        if parts:
            return "\n".join(parts)

    raise AIServiceError("OpenRouter response did not contain assistant text.")


def run_ai_test_prompt(
    prompt: str = "2+2",
    *,
    api_key: str | None = None,
    model: str | None = None,
    timeout_seconds: float = DEFAULT_TIMEOUT_SECONDS,
    max_retries: int = DEFAULT_MAX_RETRIES,
    client: httpx.Client | None = None,
) -> AITestResult:
    api_key = api_key or os.getenv("OPENROUTER_API_KEY", "").strip()
    if not api_key:
        raise AIServiceError("OPENROUTER_API_KEY is not configured.", status_code=500)

    model_name = (model or os.getenv("OPENROUTER_MODEL", DEFAULT_MODEL)).strip() or DEFAULT_MODEL
    user_prompt = (prompt or "2+2").strip()
    payload: dict[str, Any] = {
        "model": model_name,
        "messages": [
            {"role": "system", "content": "You are a concise assistant. Reply with just the answer."},
            {"role": "user", "content": user_prompt},
        ],
    }
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    created_client = client is None
    http_client = client or httpx.Client(timeout=timeout_seconds)

    started = time.perf_counter()
    attempts = 0
    try:
        while attempts <= max_retries:
            attempts += 1
            try:
                response = http_client.post(
                    OPENROUTER_CHAT_URL,
                    headers=headers,
                    json=payload,
                )
            except httpx.TimeoutException as exc:
                if attempts <= max_retries:
                    logger.warning(
                        "OpenRouter timeout, retrying",
                        extra={"attempt": attempts, "max_retries": max_retries},
                    )
                    continue
                raise AIServiceError("OpenRouter request timed out.", status_code=504) from exc
            except httpx.RequestError as exc:
                if attempts <= max_retries:
                    logger.warning(
                        "OpenRouter network error, retrying",
                        extra={"attempt": attempts, "max_retries": max_retries},
                    )
                    continue
                raise AIServiceError("OpenRouter network request failed.") from exc

            if response.status_code in RETRYABLE_STATUS_CODES and attempts <= max_retries:
                logger.warning(
                    "OpenRouter returned retryable status",
                    extra={"status_code": response.status_code, "attempt": attempts},
                )
                continue

            if response.status_code >= 400:
                try:
                    err_payload = response.json()
                except Exception:
                    err_payload = {}
                detail = (
                    err_payload.get("error", {}).get("message")
                    if isinstance(err_payload, dict)
                    else None
                ) or response.text
                raise AIServiceError(
                    f"OpenRouter request failed: {detail or response.reason_phrase}",
                    status_code=502,
                )

            data = response.json()
            response_text = _extract_response_text(data)
            latency_ms = int((time.perf_counter() - started) * 1000)

            logger.info(
                "OpenRouter call completed",
                extra={
                    "model": model_name,
                    "attempts": attempts,
                    "latency_ms": latency_ms,
                    "prompt_length": len(user_prompt),
                    "response_chars": len(response_text),
                },
            )

            return AITestResult(
                prompt=user_prompt,
                response_text=response_text,
                model=model_name,
                latency_ms=latency_ms,
                attempts=attempts,
            )

        raise AIServiceError("OpenRouter request failed after retries.")
    finally:
        if created_client:
            http_client.close()
