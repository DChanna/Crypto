import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from contextlib import asynccontextmanager
from fastapi import FastAPI

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:testpass@crypto_postgres:5432/crypto_news"
).replace('postgresql://', 'postgresql+asyncpg://')

engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    future=True,
    pool_pre_ping=True,
    connect_args={'server_settings': {'jit': 'off'}},
)

# Add SessionLocal
SessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        print("Starting up database connection...")
        async with engine.begin() as conn:
            print("Database connection successful")
        yield
    except Exception as e:
        print(f"Database connection error: {str(e)}")
        raise
    finally:
        print("Closing database connection...")
        await engine.dispose()

# Add get_db dependency
async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()