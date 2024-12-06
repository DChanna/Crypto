from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import text
from database import get_db
from models import SocialMentionChartData
from typing import List

router = APIRouter()

@router.get("/api/social-mentions", response_model=List[SocialMentionChartData])
async def get_social_mentions(db: AsyncSession = Depends(get_db)):
    # Query to identify top 3 cryptocurrencies based on total social mentions in the last 7 days
    top_cryptos_query = """
        SELECT cryptocurrencies.crypto_id AS crypto_id, cryptocurrencies.name AS crypto_name, cryptocurrencies.symbol AS symbol,
               COUNT(social_mentions.id) AS total_mentions
        FROM cryptocurrencies
        JOIN social_mentions ON cryptocurrencies.crypto_id = social_mentions.crypto_id
        WHERE social_mentions.fetch_date >= NOW() - INTERVAL '7 days'
        GROUP BY cryptocurrencies.crypto_id, cryptocurrencies.name, cryptocurrencies.symbol
        ORDER BY COUNT(social_mentions.id) DESC
        LIMIT 3
    """

    # Query to fetch daily social mentions for the last 7 days for top cryptocurrencies
    daily_mentions_query = """
        SELECT social_mentions.crypto_id AS crypto_id, DATE_TRUNC('day', social_mentions.fetch_date) AS day,
               COUNT(social_mentions.id) AS mentions
        FROM social_mentions
        WHERE social_mentions.fetch_date >= NOW() - INTERVAL '7 days'
        GROUP BY social_mentions.crypto_id, DATE_TRUNC('day', social_mentions.fetch_date)
    """

    # Final query to aggregate mentions for each of the last 7 days
    final_query = f"""
        SELECT 
            top_cryptos.crypto_id AS crypto_id,
            top_cryptos.crypto_name AS crypto_name,
            top_cryptos.symbol AS symbol,
            ARRAY_AGG(COALESCE(daily_mentions.mentions, 0) ORDER BY series.day) AS mentions
        FROM 
            generate_series(NOW() - INTERVAL '6 days', NOW(), INTERVAL '1 day') AS series(day)
        CROSS JOIN 
            ({top_cryptos_query}) AS top_cryptos
        LEFT JOIN 
            ({daily_mentions_query}) AS daily_mentions
        ON 
            daily_mentions.crypto_id = top_cryptos.crypto_id AND daily_mentions.day = series.day
        GROUP BY 
            top_cryptos.crypto_id, top_cryptos.crypto_name, top_cryptos.symbol
    """

    # Execute the final query
    results = await db.execute(text(final_query))
    results_list = results.fetchall()

    if not results_list:
        raise HTTPException(status_code=404, detail="No social mentions found")

    return [
        {
            "crypto_id": row.crypto_id,
            "crypto_name": row.crypto_name,
            "symbol": row.symbol,
            "mentions": row.mentions,
        }
        for row in results_list
    ]
