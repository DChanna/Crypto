# config.py

# poller.py


# main.py
from config import DBConfig
from database import Database
from poller import NewsPoller

def main():
    # Set up database
    config = DBConfig()
    db = Database(config)
    
    # Create and start poller
    poller = NewsPoller(db)
    
    try:
        poller.start()
    except KeyboardInterrupt:
        print("\nShutting down...")

if __name__ == "__main__":
    main()
