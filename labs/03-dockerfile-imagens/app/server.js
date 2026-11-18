const http = require("http");
const os = require("os");

const PORTA = process.env.PORTA || 3000;

const servidor = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  res.end(
    JSON.stringify(
      {
        mensagem: "Ola, Unifeg! Mensagem alterada para testar o cache de build.",
        hostname: os.hostname(),
        plataforma: os.platform(),
        versaoNode: process.version,
      },
      null,
      2
    )
  );
});

servidor.listen(PORTA, () => {
  console.log(`Servidor ouvindo na porta ${PORTA}`);
});
