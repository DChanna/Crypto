FROM node:20

WORKDIR /app

# Copy the frontend code
COPY . /app

# Install dependencies and run the frontend
RUN npm install
EXPOSE 3003
CMD ["npm", "start"]
