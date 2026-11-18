# Prática 03 — primeira imagem própria
FROM node:20-alpine

WORKDIR /app

# Copiado antes do restante do código para aproveitar o cache de camadas:
# só reinstala dependências quando package.json mudar.
COPY app/package.json ./
RUN npm install --omit=dev

COPY app/server.js ./

ENV PORTA=3000
EXPOSE 3000

# Desafio: confirma que a rota / responde HTTP 200
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
