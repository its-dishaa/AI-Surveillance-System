from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.api.analytics import router as analytics_router

from app.core.config import settings
from app.core.logging import logger

from app.database.database import Base, engine

import app.models
from app.api.track import router as track_router


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    debug=settings.debug,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created.")
    logger.info("AI Surveillance Backend Started")


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("AI Surveillance Backend Stopped")


# Register routers
app.include_router(api_router)
app.include_router(analytics_router)
app.include_router(track_router)