FROM python:3.13

WORKDIR /app

# Copy backend files
COPY . /app

# Install dependencies
COPY ./requirements.txt /app
RUN pip install -r requirements.txt

CMD ["sh", "-c", "uvicorn main:app --host 127.0.0.1 --port 8004"]
