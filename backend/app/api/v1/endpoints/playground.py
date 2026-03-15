import asyncio
import resource
import sys
from io import StringIO
from contextlib import redirect_stdout, redirect_stderr

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter()

TIMEOUT_SECONDS = 10
MAX_OUTPUT_BYTES = 50_000


class RunRequest(BaseModel):
    code: str = Field(..., min_length=1, max_length=10_000)
    language: str = Field(..., pattern="^(python)$")  # Only Python for now


class RunResponse(BaseModel):
    output: str
    error: str | None = None
    duration_ms: float


async def _execute_python(code: str) -> tuple[str, str | None]:
    """Execute Python code in a restricted subprocess environment."""
    import subprocess
    import time

    start = time.monotonic()

    # Use subprocess for isolation — never exec user code in the server process
    proc = await asyncio.create_subprocess_exec(
        sys.executable,
        "-c",
        code,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
        # Restrict memory to 64MB
        preexec_fn=lambda: resource.setrlimit(
            resource.RLIMIT_AS, (64 * 1024 * 1024, 64 * 1024 * 1024)
        ),
    )

    try:
        stdout, stderr = await asyncio.wait_for(
            proc.communicate(), timeout=TIMEOUT_SECONDS
        )
    except asyncio.TimeoutError:
        proc.kill()
        return "", "Execution timed out (10s limit)"

    output = stdout.decode("utf-8", errors="replace")[:MAX_OUTPUT_BYTES]
    err = stderr.decode("utf-8", errors="replace")[:2_000] if stderr else None

    duration = (time.monotonic() - start) * 1000
    return output, err


@router.post("/run", response_model=RunResponse)
async def run_code(request: RunRequest):
    if request.language != "python":
        raise HTTPException(status_code=400, detail="Only Python is supported currently")

    import time
    start = time.monotonic()
    output, error = await _execute_python(request.code)
    duration = (time.monotonic() - start) * 1000

    return RunResponse(output=output, error=error, duration_ms=duration)
