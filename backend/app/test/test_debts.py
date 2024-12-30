# tests/test_debts.py

def test_create_debt(client):
    # Cria uma dívida
    response = client.post("/debts/create", json={
        "title": "Cartão de Crédito",
        "amount": 500.00,
        "due_date": "2024-01-01",
        "status": "Pendente",
        "notes": "Fatura de dezembro"
    })
    assert response.status_code == 200
    assert response.json()["title"] == "Cartão de Crédito"
    assert response.json()["amount"] == 500.00

def test_list_debts(client):
    # Lista dívidas
    response = client.get("/debts/list")
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_update_debt(client):
    # Atualiza uma dívida existente
    client.post("/debts/create", json={
        "title": "Cartão de Crédito",
        "amount": 500.00,
        "due_date": "2024-01-01",
        "status": "Pendente",
        "notes": "Fatura de dezembro"
    })

    response = client.put("/debts/update/1", json={
        "title": "Cartão Alterado",
        "amount": 600.00,
        "due_date": "2024-02-01",
        "status": "Pago",
        "notes": "Atualizado"
    })
    assert response.status_code == 200
    assert response.json()["title"] == "Cartão Alterado"


def test_delete_debt(client):
    # Deleta uma dívida
    client.post("/debts/create", json={
        "title": "Cartão de Crédito",
        "amount": 500.00,
        "due_date": "2024-01-01",
        "status": "Pendente",
        "notes": "Fatura de dezembro"
    })

    response = client.delete("/debts/delete/1")
    assert response.status_code == 200
    assert response.json()["detail"] == "Dívida removida com sucesso"