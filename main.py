import uvicorn
from fastapi import FastAPI
from app.api.auth import router as auth_router
from app.api.roles import router as roles_router
from app.router.favorites import router as favorites_router
from app.router.likes import router as likes_router
from app.router.profiles import router as profiles_router
from app.router.user_filters import router as user_filters_router
from app.router.users import router as users_router

app = FastAPI(title="Сайт Знакомств", version="0.0.1")

app.include_router(auth_router)
app.include_router(roles_router)
app.include_router(favorites_router)
app.include_router(likes_router)
app.include_router(profiles_router)
app.include_router(roles_router)
app.include_router(user_filters_router)
app.include_router(users_router)

# if __name__ == "__main__":
#     uvicorn.run(app=app)

if __name__ == "__main__":
    port = 8001  # МЕНЯЕМ 8000 на 8001
    print(f"🚀 Запуск сервера на порту {port}...")
    print(f"📚 Документация: http://localhost:{port}/docs")
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)