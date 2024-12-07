import psycopg2
from datetime import datetime, timedelta
import random
from dataclasses import dataclass
import numpy as np
import uuid

"""
Note to the grading team: 

This script was generated using genAI for creating dummy data for the crypto_news database.
We chose to do this because when you run the container, the database is empty and the application
will not work accurately without data.

"""

def generate_sentiment(crypto_id, timestamp):
    hour = timestamp.hour
    is_market_hours = 8 <= hour <= 22

    base_sentiments = {1: 0.2, 2: 0.15, 3: 0.1}  # Bitcoin slightly more positive
    base = base_sentiments.get(crypto_id, 0)

    time_modifier = 0.1 if is_market_hours else -0.05
    noise = np.random.normal(0, 0.2)

    return min(1, max(-1, base + time_modifier + noise))

def generate_volume(timestamp):
    """Generate realistic posting volume based on time of day."""
    hour = timestamp.hour

    if 8 <= hour <= 22:
        return random.randint(15, 25)
    elif 23 <= hour or hour <= 3:
        return random.randint(2, 5)
    else:
        return random.randint(5, 10)

def insert_record(cursor, sql, data):
    """Insert a single record and handle any errors."""
    try:
        cursor.execute(sql, data)
        return True
    except psycopg2.Error as e:
        print(f"Failed to insert record: {e}")
        print(f"Failed data: {data}")
        return False

def create_data(db_config):
    conn = psycopg2.connect(
        host=db_config.host,
        port=db_config.port,
        database="crypto_news",
        user=db_config.user,
        password=db_config.password
    )

    try:
        cur = conn.cursor()
        end_date = datetime.now()
        start_date = end_date - timedelta(days=7)
        current = start_date

        successful_news = 0
        failed_news = 0
        successful_social = 0
        failed_social = 0

        crypto_names = {
            1: ("Bitcoin", "BTC", "$BTC", "bitcoin"),
            2: ("Ethereum", "ETH", "$ETH", "ethereum"),
            3: ("Litecoin", "LTC", "$LTC", "litecoin")
        }

        news_sources = [
            "nytimes.com",
            "theguardian.com"
        ]

        news_sql = """
            INSERT INTO news_mentions 
            (crypto_id, fetch_date, article_id, url, headline, 
             content, sentiment_score, author, read_count, published_date, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        social_sql = """
            INSERT INTO social_mentions 
            (crypto_id, fetch_date, post_id, subreddit, url, title,
             content, score, comment_count, sentiment_score, is_post, author, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        while current < end_date:
            print(f"Generating data for hour: {current}")
            hourly_volume = generate_volume(current)

            for crypto_id in [1, 2, 3]:
                crypto_name, symbol, ticker, subreddit = crypto_names[crypto_id]

                # Generate news mentions
                for _ in range(hourly_volume // 3):
                    try:
                        sentiment = generate_sentiment(crypto_id, current)
                        source = random.choice(news_sources)
                        article_id = f"{crypto_id}_{current.strftime('%Y%m%d%H')}_{random.randint(1000, 9999)}"
                        created_at = current - timedelta(minutes=random.randint(0, 59))

                        headlines = [
                            f"{crypto_name} Shows {('Bullish' if sentiment > 0 else 'Bearish')} Signs as Markets React",
                            f"{symbol} Price Analysis: Technical Indicators Suggest {('Upward' if sentiment > 0 else 'Downward')} Trend",
                            f"Market Analysis: {crypto_name} {('Gains' if sentiment > 0 else 'Loses')} Momentum",
                            f"Institutional Investors {('Increase' if sentiment > 0 else 'Decrease')} {symbol} Holdings",
                        ]

                        news_data = (
                            crypto_id,
                            current,
                            article_id,
                            f"https://{source}/article/{article_id}",
                            random.choice(headlines),
                            f"Extended analysis of {crypto_name}'s market performance...",
                            sentiment,
                            f"Crypto Analyst {random.randint(1, 5)}",
                            random.randint(50, 500) if current < end_date - timedelta(hours=12) else random.randint(10, 50),
                            current - timedelta(minutes=random.randint(10, 59)),
                            created_at
                        )

                        if insert_record(cur, news_sql, news_data):
                            successful_news += 1
                        else:
                            failed_news += 1

                    except Exception as e:
                        print(f"Error generating news data: {e}")
                        failed_news += 1
                        continue

                # Generate social mentions
                for _ in range(hourly_volume):
                    try:
                        sentiment = generate_sentiment(crypto_id, current)
                        post_id = f"post_{crypto_id}_{current.strftime('%Y%m%d%H')}_{random.randint(1000, 9999)}"
                        created_at = current - timedelta(minutes=random.randint(0, 59))

                        if sentiment > 0:
                            title_templates = [
                                f"Just bought more {symbol}! 🚀",
                                f"Here's why {crypto_name} will reach new ATH",
                                f"Bullish on {ticker} - Technical Analysis",
                                f"{symbol} looking strong after recent developments",
                            ]
                        else:
                            title_templates = [
                                f"Concerns about {crypto_name}'s current trend",
                                f"{symbol} price action looking weak",
                                f"Should we be worried about {ticker}?",
                                f"Technical Analysis: {symbol} at critical support",
                            ]

                        score_base = int((sentiment + 1) * 50)
                        score = max(0, random.randint(score_base - 20, score_base + 100))

                        social_data = (
                            crypto_id,
                            current,
                            post_id,
                            f"r/{subreddit}",
                            f"https://reddit.com/r/{subreddit}/comments/{post_id}",
                            random.choice(title_templates),
                            f"Detailed discussion about {crypto_name}'s recent market movements and technical analysis...",
                            score,
                            random.randint(0, max(1, score // 2)),
                            sentiment,
                            True,
                            f"crypto_trader_{random.randint(1000, 9999)}",
                            created_at
                        )

                        if insert_record(cur, social_sql, social_data):
                            successful_social += 1
                        else:
                            failed_social += 1

                    except Exception as e:
                        print(f"Error generating social data: {e}")
                        failed_social += 1
                        continue

            current += timedelta(hours=1)

            # Commit every hour to avoid losing too much data if something fails
            try:
                conn.commit()
                print(f"Committed data for hour: {current}")
            except Exception as e:
                print(f"Failed to commit hour {current}: {e}")
                conn.rollback()

        print(f"""
Data generation complete:
News mentions: {successful_news} successful, {failed_news} failed
Social mentions: {successful_social} successful, {failed_social} failed
        """)

    except Exception as e:
        print(f"Error creating sample data: {e}")
        conn.rollback()
    finally:
        conn.close()

def main():
    # @dataclass
    # class DBConfig:
    #     # Values for port, user, and password need to be personalized - **EDIT**
    #     host: str = "localhost"
    #     port: int = 5431
    #     database: str = "crypto_news"
    #     user: str = "postgres"
    #     password: str = "testpass"

    @dataclass
    class DBConfig:
        host: str = "postgres"  
        port: int = 5432 
        database: str = "crypto_news"
        user: str = "postgres"
        password: str = "testpass"

    config = DBConfig()
    create_data(config)

if __name__ == "__main__":
    main()
