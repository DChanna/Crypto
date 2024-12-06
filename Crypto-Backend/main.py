from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import lifespan
from endpoints import hello, top_post, totals, top_crypto, social_mentions, news_counts, media_sentiments, summary_data

app = FastAPI(lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Update this to match your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(hello.router, prefix="")
app.include_router(top_post.router, prefix="")
app.include_router(totals.router, prefix="")
app.include_router(top_crypto.router, prefix="")
app.include_router(social_mentions.router, prefix="")
app.include_router(news_counts.router, prefix="")
app.include_router(media_sentiments.router, prefix="")
app.include_router(summary_data.router, prefix="")
