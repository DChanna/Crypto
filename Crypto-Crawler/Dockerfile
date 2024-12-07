FROM python:3.11

WORKDIR /app

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Copy the crawler scripts
COPY . /app

# Install dependencies
COPY ./requirements.txt /app
RUN pip install -r requirements.txt

# Run scripts in order and create completion marker
CMD ["sh", "-c", "python generateDB.py && python main.py && python crypto-data-generator-2.py && python sentiment.py && python poller.py && touch /tmp/crawler_done"]
