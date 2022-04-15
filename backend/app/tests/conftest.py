from typing import Dict, Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..main import app


@pytest.fixture(scope="session")
def db() -> Generator:
    yield SessionLocal()


@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(app) as c:
        yield c


def get_dummy_user(client: TestClient) -> Dict[str, str]:
    login_data = {
        "username": "labas",
        "password": "labas",
    }
    r = client.post("/token", data=login_data)
    tokens = r.json()
    a_token = tokens["access_token"]
    headers = {"Authorization": f"Bearer {a_token}"}
    return headers


@pytest.fixture(scope="module")
def dummy_user_token_headers(client: TestClient) -> Dict[str, str]:
    return get_dummy_user(client)
