import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.api.auth import router as auth_router
from app.api.roles import router as roles_router
from app.router.favorites import router as favorites_router
from app.router.likes import router as likes_router
from app.router.profiles import router as profiles_router
from app.router.user_filters import router as user_filters_router
from app.router.users import router as users_router
from app.database.database import create_tables

app = FastAPI(title="Сайт Знакомств", version="0.0.1")

app.include_router(auth_router)
app.include_router(roles_router)
app.include_router(favorites_router)
app.include_router(likes_router)
app.include_router(profiles_router)
app.include_router(users_router)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Root endpoint - serve the frontend
@app.get("/")
async def read_root():
    return FileResponse("static/index.html")

# API endpoint to get profiles (demo)
@app.get("/api/profiles")
async def get_profiles():
    # Return sample profiles for demo
    return [
        {
            "id": 1,
            "name": "Анна",
            "age": 24,
            "city": "Москва",
            "bio": "Люблю кофе и путешествия",
            "photo": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=800&q=80"
        },
        {
            "id": 2,
            "name": "Данил",
            "age": 27,
            "city": "Санкт-Петербург",
            "bio": "Музыка, спорт, кино",
            "photo": "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=800&q=80"
        }
    ]

@app.on_event("startup")
async def startup_event():
    await create_tables()
    print("✅ База данных инициализирована")

if __name__ == "__main__":
    port = 8001  # МЕНЯЕМ 8000 на 8001
    print(f"🚀 Запуск сервера на порту {port}...")
    print(f"📚 Документация: http://localhost:{port}/docs")
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)
