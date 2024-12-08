FROM python:3.13

WORKDIR /app

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y netcat-openbsd

# Copy the crawler scripts
COPY . /app

# Install dependencies
COPY ./requirements.txt /app
RUN pip install -r requirements.txt

RUN python -m nltk.downloader vader_lexicon
