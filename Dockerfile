# Stage 1: Build
FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .

# Stage 2: Runtime
FROM alpine:3.18
WORKDIR /app
RUN apk add --no-cache nodejs
COPY --from=builder /usr/src/app /app
EXPOSE 3000
CMD ["node", "index.js"]