FROM python:3.13

LABEL quay.expires-after=4w

WORKDIR /app

COPY ./Crypto-Backend /app

COPY ./requirements.txt /app

RUN pip install -r requirements.txt

EXPOSE 8000

# CMD ["sh", "-c", "uvicorn main:app --reload"]

CMD ["sh", "-c", "uvicorn main:app --reload --host 0.0.0.0", "--port", "8000"]


# # Use an official lightweight Python image
# FROM python:3.13-slim

# # Metadata
# LABEL maintainer="Dhruv Channa <dchanna@usc.edu>"
# LABEL quay.expires-after="4w"

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the application source code
# COPY ./Crypto-Backend /app

# # Copy the requirements file
# COPY ./requirements.txt /app

# # Install dependencies
# RUN pip install -r requirements.txt

# # Expose the application port
# EXPOSE 8000

# # Command to run the application
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
