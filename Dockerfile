# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Dependency management
COPY package*.json ./
RUN npm install

# Copy source and build (Optimized for Rolldown-Vite)
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Security: Run as non-privileged user (SbD)
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

# Copy custom hardened nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
