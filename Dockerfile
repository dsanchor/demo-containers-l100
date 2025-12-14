# Stage 1: Build the Angular application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY container-demo/package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci && npm cache clean --force

# Copy application source
COPY container-demo/ ./

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from build stage
COPY --from=build /app/dist/container-demo/browser /usr/share/nginx/html

# Copy env-config template
COPY env-config.template.js /usr/share/nginx/html/assets/env-config.template.js

# Create a script to inject environment variables at runtime using envsubst
RUN echo '#!/bin/sh' > /docker-entrypoint.d/40-envsubst-on-env-config.sh && \
    echo 'set -e' >> /docker-entrypoint.d/40-envsubst-on-env-config.sh && \
    echo 'envsubst < /usr/share/nginx/html/assets/env-config.template.js > /usr/share/nginx/html/assets/env-config.js' >> /docker-entrypoint.d/40-envsubst-on-env-config.sh && \
    echo 'echo "Environment variables injected into env-config.js"' >> /docker-entrypoint.d/40-envsubst-on-env-config.sh && \
    chmod +x /docker-entrypoint.d/40-envsubst-on-env-config.sh

# Expose port 80
EXPOSE 80

# Default environment variable
ENV BACKGROUND_COLOR=#ffffff

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
