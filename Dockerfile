# Stage 1: Base image
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Development image with hot reload
FROM base AS development
WORKDIR /app
COPY . .  
CMD ["npm", "run", "start"]
