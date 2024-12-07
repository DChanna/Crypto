FROM python:3.13

WORKDIR /app

# Copy backend files
COPY . /app

# Install dependencies
COPY ./requirements.txt /app
RUN pip install -r requirements.txt

# Copy the wait-for-crawler.sh script and make it executable
COPY ./wait-for-crawler.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-crawler.sh

# Use wait script to delay backend start until crawler completes
CMD ["sh", "-c", "wait-for-crawler.sh /tmp/crawler_done && uvicorn main:app --host 0.0.0.0 --port 8004"]
