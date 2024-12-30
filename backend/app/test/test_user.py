# tests/test_users.py

def test_register_user(client):
    response = client.post("/users/register", json={
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpassword"
    })
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"
    assert response.json()["email"] == "testuser@example.com"

def test_login_user(client):
    # Primeiro, registra um usuário
    client.post("/users/register", json={
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpassword"
    })

    # Testa o login
    response = client.post("/users/login", json={
        "username": "testuser",
        "password": "testpassword"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()