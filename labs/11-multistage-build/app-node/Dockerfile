# Multi-stage build: o estágio "builder" tem tudo que é preciso para
# COMPILAR (TypeScript, devDependencies); o estágio final (base alpine)
# recebe só o resultado — dist/ e as dependências de produção.

# ---- estágio 1: build ----
FROM node:20 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---- estágio de teste (desafio) ----
# Herda do builder e roda verificações. Não é usado pelo estágio final, então
# não entra na imagem :multi. Rode com: docker build --target test .
FROM builder AS test
RUN test -f dist/index.js \
 && npx tsc --noEmit \
 && node -e "require('fs').accessSync('dist/index.js'); console.log('testes OK')"

# ---- estágio 2: produção ----
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/index.js"]
