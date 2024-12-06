Steps to running the application:
1. Navigate to the root of the project. Create and run the virtual environment, establishing dependencies
    - python3 -m venv venv
    - source venv/bin/activate
    - pip install -r requirements.txt
2. Ensure you have Kafka (with Zookeeper) and Postgres installed and running
3. Create a postgres database called "crypto_news" with user credentials
4. Navigate to /Crypto-Crawler
    - Cmd+F every instance of "**EDIT**" and replace those variables with appropriate values
        - Includes port, user/password, Kafka path, and other user-specific values for running locally
5. Run the following files in order (i.e. python file_to_run.py)
    - generateDB.py
    - main.py (will not terminate)
    - (in a new terminal) sentiment.py
    - poller.py (will not terminate)
6. In a new terminal, navigate to /Crypto-Backend
    - Ensure all "**EDIT**" instances are dealt with if not done prior.
7. Run the following command - "uvicorn main:app --reload"
    - Obtain the port provided in the run setup (bolded white message, likely http://127.0.0.1:8000)
8. In a new terminal, navigate to /Crypto-Frontend
    - Handle all "**EDIT**" instances
    - Run "npm install" to install all dependencies for the frontend.
9. Run "npm start" to start the application
