from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth_routes, repo_routes, user_routes

app = FastAPI(
    title="Wope Code Assistant",
   redirect_slashes=False
   )

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(repo_routes.router)
app.include_router(user_routes.router)

@app.get("/")
def health_check():
    return {"status": "ok"}
