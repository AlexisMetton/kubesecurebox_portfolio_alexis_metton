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

# Next export avec trailingSlash: true génère des dossiers avec index.html
# nginx par défaut sert index.html pour les répertoires
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
