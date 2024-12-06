import psycopg2
from config import DBConfig

class Database:
    def __init__(self, config: DBConfig):
        self.config = config
        self.conn = self.connect()

    def connect(self):
        return psycopg2.connect(
            host=self.config.host,
            port=self.config.port,
            database=self.config.database,
            user=self.config.user,
            password=self.config.password
        )