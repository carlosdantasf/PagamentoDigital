FROM node:20-alpine3.19
ENV NODE_ENV=production
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont 

WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . ./


EXPOSE 3000
CMD ["npm","start"]



