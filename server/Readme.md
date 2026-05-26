# 🛠️ Wope Bug Finder Backend

Welcome to the backend server for **Wope Bug Finder**, an AI-powered code assistant that logs in users via GitHub OAuth, syncs their repositories, and runs AI-based bug-finding analysis on their pull requests.

This backend is built on **FastAPI** using an asynchronous connection to **PostgreSQL** via **SQLAlchemy (v2.0)** and migration tracking with **Alembic**.

---

## 🚀 Tech Stack

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Database ORM**: [SQLAlchemy 2.0](https://www.sqlalchemy.org/) (AsyncPG driver)
- **Database Migrations**: [Alembic](https://alembic.sqlalchemy.org/)
- **Settings Management**: [Pydantic Settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/)
- **Authentication**: GitHub OAuth 2.0 (with secure AES-256 token encryption using `cryptography`)
- **HTTP Client**: [HTTPX](https://www.python-httpx.org/) (for communicating with GitHub APIs)

---

## 📁 Repository Structure

```text
server/
├── app/
│   ├── auth/            # GitHub OAuth utilities & encryption middleware
│   ├── config/          # Application configuration using Pydantic Settings
│   ├── db/              # DB base model, async sessions, and DB schemas
│   │   ├── crud/        # CRUD operations for users and repositories
│   │   └── models/      # SQLAlchemy ORM Models (User, Repository)
│   ├── routes/          # FastAPI API endpoint routers (auth, repos)
│   ├── services/        # Business logic layer (authentication and repo syncing)
│   └── app.py           # FastAPI application instantiation and router wiring
├── migrations/          # Alembic database migration versions
├── alembic.ini          # Alembic configuration file
├── main.py              # Application entrypoint to run Uvicorn
├── requirements.txt     # Python package requirements
└── .env.example         # Template for environment variables
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- **Python**: Make sure you have Python `3.10` or higher installed.
- **PostgreSQL**: Ensure a PostgreSQL instance is running locally or remotely.

### 2. Installation
Navigate to the `server/` directory and create a virtual environment:

```bash
# Create a virtual environment
python -m venv .venv

# Activate it (Mac/Linux)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Environment Variables
Create a `.env` file in the root of the `server/` directory and populate it with the appropriate credentials. You can use the values below as a reference:

```env
APP_NAME=Wope Bug Finder
APP_ENV=Development

# Database URI (must use asyncpg for async SQLAlchemy)
DATABASE_URL=postgresql+asyncpg://postgres:<password>@localhost/<db_name>

# GitHub OAuth App Credentials
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
GITHUB_REDIRECT_URI=http://localhost:8000/auth/github/callback

# Security Keys
SECRET_KEY=<generate-a-secure-random-string>
ENCRYPTION_KEY=<generate-a-32-byte-base64-key-for-token-encryption>
```

> 💡 **Tip**: You can generate a valid URL-safe 32-byte key for `ENCRYPTION_KEY` using python:
> ```bash
> python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
> ```

### 4. Database Migrations
Before running the backend, make sure to apply the Alembic database migrations:

```bash
# Apply migrations to update your local DB schema
alembic upgrade head
```

### 5. Running the Server
Start the development server using the entrypoint script:

```bash
python main.py
```

The FastAPI application will start running on **[http://localhost:8000](http://localhost:8000)** with hot-reload enabled. You can access the auto-generated interactive OpenAPI docs at **[http://localhost:8000/docs](http://localhost:8000/docs)**.

---

## 🔌 API Endpoints

### 🩺 System
- **`GET /`**: Health check. Returns `{"status": "ok"}`.

### 🔑 Authentication (`/auth`)
- **`GET /auth/github/login`**: Redirects the user's browser to the GitHub OAuth authorization consent page.
- **`GET /auth/github/callback`**: The callback URL GitHub redirects to, containing a temporary `code`. The server exchanges it for a GitHub Access Token, saves/updates the User record (with the token securely encrypted), and returns the login profile.

### 📁 Repositories (`/repos`)
- **`GET /repos/{github_id}`**: Syncs and retrieves the repositories belonging to the user specified by their GitHub ID.
  1. Fetches the user from the database.
  2. Decrypts their access token.
  3. Fetches the latest repository metadata from the GitHub API.
  4. Saves/updates the repositories in the database.
  5. Returns the updated list of repositories.
