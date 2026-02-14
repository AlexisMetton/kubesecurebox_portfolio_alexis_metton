# Portfolio Alexis Metton - Next.js export statique servi par nginx
# ================================================================
# Stage 1 : build Next.js (output: 'export' → out/)
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build:seo

# Stage 2 : servir out/ avec nginx
FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html

# Non-root: nginx must listen on 8080 (port 80 requires root)
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 8080;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name _;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / { try_files $uri $uri/ /index.html; }' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Run as non-root user
USER nginx
EXPOSE 8080

# Next export avec trailingSlash: true génère des dossiers avec index.html
# nginx par défaut sert index.html pour les répertoires
CMD ["nginx", "-g", "daemon off;"]
