# Multi-stage build for React frontend

# Stage 1: Build static assets
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency specifications first to leverage caching
COPY package*.json ./
RUN npm ci

# Copy application source code
COPY . .

# Optional build argument if custom API URL is needed
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL

# Build the production bundle
RUN npm run build

# Stage 2: Serve with lightweight Nginx web server
FROM nginx:alpine

# Copy built assets to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for SPA routing and API proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
