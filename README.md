# Gestão de Dívidas Pessoais

## Visão Geral
Este é um projeto de gestão de dívidas pessoais, desenvolvido para ajudar os usuários a organizarem melhor suas vidas financeiras. O sistema permite:
- Cadastro de novas dívidas
- Listagem de todas as dívidas registradas
- Edição e exclusão de dívidas
- Visualização de um painel de resumo financeiro

## Tecnologias Utilizadas

| Tecnologia    | Versão   | Marca                                      |
|---------------|----------|--------------------------------------------|
| Python        | 3.11     | <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" width="50"/> |
| FastAPI       | 0.95.2   | <img src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" alt="FastAPI" width="130"/> |
| React         | 18.2.0   | <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="50"/> |
| TypeScript    | 4.9.5    | <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" width="50"/> |
| Material-UI   | 5.11.15  | <img src="https://v4.mui.com/static/logo.png" alt="Material-UI" width="50"/> |

## Estrutura do Projeto

### Backend
```
backend/
├── app/
│   ├── controllers/
│   ├── dto/
│   ├── models/
│   ├── services/
│   ├── configurations/
│   └── main.py
├── .env
└── requirements.txt
```

### Frontend
```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── App.tsx
├── package.json
└── tsconfig.json
```

## Como Executar o Projeto

### Backend
1. Certifique-se de ter o Python 3.11 instalado.
2. Clone o repositório e navegue até o diretório `backend`.
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure o arquivo `.env` com as variáveis de ambiente necessárias.
5. Execute o servidor:
   ```bash
   uvicorn app.main:app --reload
   ```
6. Acesse a documentação interativa em [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

### Frontend
1. Certifique-se de ter o Node.js e o npm instalados.
2. Navegue até o diretório `frontend`.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Execute o servidor de desenvolvimento:
   ```bash
   npm start
   ```
5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Funcionalidades
- **Cadastro de Dívidas**: Inclua título, valor, data de vencimento, status e observações.
- **Listagem de Dívidas**: Visualize todas as dívidas cadastradas com destaque para as atrasadas.
- **Resumo Financeiro**: Painel com total de dívidas cadastradas, valor total de dívidas pendentes, quantidade de dívidas pagas e atrasadas, com visualização gráfica.
- **Autenticação**: Registro e login com token JWT.

## Exemplos Visuais

## Resumo Financeiro
![Resumo Financeiro](docs/img-resume-fin.png)

### Swagger - Documentação da API
![Swagger](docs/img-swagger.png)

### Tela Inicial
![Tela Inicial](docs/img-home-app.png)


## Contato
Em caso de dúvidas ou sugestões, entre em contato pelo e-mail: m4r6i0@gmail.com.
