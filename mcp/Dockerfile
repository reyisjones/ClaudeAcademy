FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json .
COPY src ./src
RUN npm run build

RUN addgroup -S mcpgroup && adduser -S mcpuser -G mcpgroup
USER mcpuser

EXPOSE 3100

CMD ["node", "dist/index.js"]
