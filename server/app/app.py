from fastapi import FastAPI
from app.routes import auth_routes, repo_routes

app = FastAPI(
    title="Wope Code Assistant",
   redirect_slashes=False
   )

app.include_router(auth_routes.router)
app.include_router(repo_routes.router)

@app.get("/")
def health_check():
    return {"status": "ok"}
