from urllib import response
from fastapi.testclient import TestClient
import random
import string
from typing import Dict

from sqlalchemy.orm import Session
from .. import crud


def random_lower_string() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=32))


def random_email() -> str:
    return f"{random_lower_string()}@{random_lower_string()}.com"


def test_index_unauthorized(client: TestClient):
    response = client.get("/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_create_user(client: TestClient):
    username = random_lower_string()
    password = random_lower_string()
    email = random_email()
    response = client.post("/users/", json={
        "user": username,
        "email": email,
        "password": password
    })
    created_user = response.json()
    assert response.status_code == 200
    assert created_user["user"] == username
    assert created_user["email"] == email
    # assert that password is hashed
    assert created_user["hashed_password"] != password
    assert created_user["active"] is True
    assert created_user["contents"] == []


def test_login_user(client: TestClient, dummy_user_token_headers: Dict[str, str]):
    """Assert that a user that has previously been created manualy can login and gets a bearer auth token"""
    response = client.post("users/me", headers=dummy_user_token_headers)
    current_user = response.json()
    assert current_user
    # assert response.status_code == 200
    # assert current_user["contentes"[0]["id"]] == 16
    # assert current_user["id"] == 31


def test_get_dummy_user(client: TestClient) -> Dict[str, str]:
    login_data = {
        "username": "labas",
        "password": "labas",
    }
    r = client.post("/token", data=login_data)
    tokens = r.json()
    a_token = tokens["access_token"]
    headers = {"Authorization": f"Bearer {a_token}"}
    assert tokens["access_token"] == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInVzZXIiOiJsYWJhcyJ9.BuqCDJ2XLoozenfpzMfx0cDHuQkhgVcEmd5W8KfFiq0"
    assert tokens["user"] == "labas"

# def test_create_content(client: TestClient, dummy_user_token_headers: Dict[str, str]):
#     content_url = "https://google.com"
#     response = client.post("content", json={"content_url": content_url})
#     assert response.status_code == 200
