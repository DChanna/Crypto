import psycopg2
from datetime import datetime, timedelta
import random
from dataclasses import dataclass

def create_sample_data(db_config):
    conn = psycopg2.connect(
        host=db_config.host,
        port=db_config.port,
        database="crypto_news",
        user=db_config.user,
        password=db_config.password
    )

    try:
        cur = conn.cursor()

        # Sample news mentions
        news_data = [
            (crypto_id, datetime.now() - timedelta(hours=random.randint(1, 48)),
             f'article_{crypto_id}_{i}',  # Ensure unique article_id per crypto
             f'http://example.com/{crypto_id}_{i}',  # Ensure unique URL
             f'Headline {crypto_id}_{i}', f'Content {crypto_id}_{i}',
             random.uniform(-1, 1), 'Author Name',
             random.randint(100, 1000), datetime.now() - timedelta(hours=random.randint(1, 48)))
            for i in range(100)
            for crypto_id in [1, 2, 3]
        ]

        cur.executemany("""
            INSERT INTO news_mentions 
            (crypto_id, fetch_date, article_id, url, headline, 
             content, sentiment_score, author, read_count, published_date)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, news_data)

        # Sample social mentions
        social_data = [
            (crypto_id, datetime.now() - timedelta(hours=random.randint(1, 48)),
             f'post_{crypto_id}_{i}',  # Ensure unique post_id
             'r/bitcoin' if crypto_id == 1 else 'r/ethereum',
             f'http://reddit.com/{crypto_id}_{i}',  # Ensure unique URL
             f'Title {crypto_id}_{i}', f'Content {crypto_id}_{i}',
             random.randint(-100, 1000), random.randint(0, 100),
             random.uniform(-1, 1), True, f'user_{crypto_id}_{i}')
            for i in range(200)
            for crypto_id in [1, 2, 3]
        ]

        cur.executemany("""
            INSERT INTO social_mentions 
            (crypto_id, fetch_date, post_id, subreddit, url, title,
             content, score, comment_count, sentiment_score, is_post, author)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, social_data)

        conn.commit()
        print("Sample data created successfully")

    except Exception as e:
        print(f"Error creating sample data: {e}")
        conn.rollback()
    finally:
        conn.close()


def main():
    @dataclass
    class DBConfig:
        # Values for port, user, and password need to be personalized - **EDIT**
        host: str = "localhost"
        port: int = 5431
        database: str = "crypto_news"
        user: str = "postgres"
        password: str = "testpass"


    config = DBConfig()

    create_sample_data(config)

if __name__ == "__main__":
    main()