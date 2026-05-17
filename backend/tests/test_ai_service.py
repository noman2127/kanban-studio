import httpx
import pytest
import sys
from pathlib import Path

backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))
from services.ai_service import AIServiceError, run_ai_test_prompt


def test_run_ai_test_prompt_success():
    def handler(request: httpx.Request) -> httpx.Response:
        assert request.url == httpx.URL("https://openrouter.ai/api/v1/chat/completions")
        payload = request.read().decode()
        assert "2+2" in payload
        return httpx.Response(
            200,
            json={
                "choices": [
                    {"message": {"content": "4"}}
                ]
            },
        )

    transport = httpx.MockTransport(handler)
    client = httpx.Client(transport=transport, timeout=30.0)
    try:
        result = run_ai_test_prompt(
            prompt="2+2",
            api_key="test-key",
            client=client,
        )
    finally:
        client.close()

    assert result.response_text == "4"
    assert result.attempts == 1


def test_run_ai_test_prompt_retries_on_503_then_succeeds():
    calls = {"count": 0}

    def handler(_: httpx.Request) -> httpx.Response:
        calls["count"] += 1
        if calls["count"] == 1:
            return httpx.Response(503, json={"error": {"message": "busy"}})
        return httpx.Response(
            200,
            json={"choices": [{"message": {"content": "4"}}]},
        )

    client = httpx.Client(transport=httpx.MockTransport(handler), timeout=30.0)
    try:
        result = run_ai_test_prompt(
            prompt="2+2",
            api_key="test-key",
            max_retries=2,
            client=client,
        )
    finally:
        client.close()

    assert result.response_text == "4"
    assert result.attempts == 2


def test_run_ai_test_prompt_times_out_after_retries():
    def handler(_: httpx.Request) -> httpx.Response:
        raise httpx.TimeoutException("timeout")

    client = httpx.Client(transport=httpx.MockTransport(handler), timeout=0.01)
    try:
        with pytest.raises(AIServiceError) as exc_info:
            run_ai_test_prompt(
                prompt="2+2",
                api_key="test-key",
                max_retries=1,
                client=client,
            )
    finally:
        client.close()

    assert exc_info.value.status_code == 504
    assert "timed out" in exc_info.value.detail.lower()


def test_run_ai_test_prompt_requires_api_key():
    with pytest.raises(AIServiceError) as exc_info:
        run_ai_test_prompt(prompt="2+2", api_key="")
    assert exc_info.value.status_code == 500
