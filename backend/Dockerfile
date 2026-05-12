# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


# Production stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
# If you are using local file persistence as fallback, 
# you might want to create a data directory
RUN mkdir -p data

EXPOSE 3001

CMD ["node", "dist/index.js"]
