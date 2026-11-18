# Entrega — Roteiro Docker e Docker Compose

Ambiente: Windows 11 Home + WSL2 + Docker Desktop 4.98 (Engine 29.9.2), PowerShell 5.1.

## O que tem aqui

| Arquivo | Conteúdo |
|---|---|
| `Roteiro_Docker_Aluno_preenchido.docx` | O roteiro do professor com os **29 quadros 📎 preenchidos** com as saídas reais (e 3 prints embutidos: pgAdmin, hot reload e projeto integrador). Capa com nome, turma e data. |
| `evidencias/pratica00-prerequisitos.txt` | `wsl --status`, `docker version`, `docker info`, `hello-world` (checklist inicial) |
| `evidencias/praticaNN-*.txt` | Saída **real** de cada passo de cada prática, na ordem do roteiro, com o comando antes (`PS> ...`). Cada `## Passo N` corresponde a um passo do roteiro. Os quadros 📎 do roteiro são preenchidos copiando o trecho do passo correspondente. |
| `evidencias/pratica10-pgadmin-consulta.jpg` | Print do pgAdmin com a consulta à tabela `alunos` (Prática 10, passo 3) |
| `evidencias/pratica12-hot-reload.jpg` | Print do React depois do hot reload (Prática 12, passo 2) |
| `evidencias/pratica14-*.jpg` | Prints do frontend e do pgAdmin do projeto integrador (Prática 14, passos 4 e 5) |
| `desafios/` | Arquivos gerados nos desafios (ex.: banner do figlet da Prática 02) |

Os desafios estão no fim de cada arquivo de evidência (`## Desafio ...`). Os arquivos alterados/criados nos
desafios ficam no próprio `labs/` (veja `git status` / `git diff` na raiz do repositório).

## Diferenças em relação ao roteiro (Windows / PowerShell 5.1)

1. **Quebra de linha (CRLF).** O Git para Windows vem com `core.autocrlf=true` e baixa os arquivos com CRLF.
   Scripts `.sh` com CRLF quebram dentro do container Linux (`cat: can't open '/etc/os-release\r'`). O clone foi
   ajustado com `git config --local core.autocrlf false` + novo checkout, deixando tudo em LF.
2. **`curl` no PowerShell 5.1 é apelido de `Invoke-WebRequest`.** Foi usado `curl.exe` (o curl de verdade, que
   já vem no Windows 11) em todos os passos com `curl`.
3. **JSON no `-d` (Prática 14).** No PowerShell 5.1 o comando do roteiro não funciona: as aspas internas somem ao
   chamar um `.exe`, e mesmo escapando com `\"` o argumento é partido no espaço de "Diego Alves" (o backend
   respondeu `Unterminated string in JSON` — a tentativa está registrada no log). A solução usada foi gravar o
   JSON em `labs/14-projeto-integrador/aluno.json` e enviar com `curl.exe ... -d "@aluno.json"`.
   (Alternativa nativa: `Invoke-RestMethod -Method Post -ContentType 'application/json' -Body '{...}' <url>`.)
4. **Prática 12, passo 3.** O comando Windows do roteiro (`... | Measure-Object | Select -Expand Count` dentro do
   `sh -c`) não funciona: são cmdlets do PowerShell rodando dentro do `sh` do container. Foi usado
   `ls /app/node_modules | wc -l`, como na versão Ubuntu.
5. **Terminal interativo (`-it`).** Os passos com shell interativo (Práticas 01 e 02) foram executados com `-i` e os
   comandos enviados pela entrada padrão (listados no log como "comandos digitados dentro do container"); o
   efeito é o mesmo. `docker compose exec` recebeu `-T` e `logs -f` foi usado sem `-f`, pelo mesmo motivo.
6. **Containers rodando em primeiro plano** (`docker run --rm -p ...` + "em outro terminal: curl") foram rodados
   com `-d` e `--name`, testados com `curl.exe` e parados com `docker stop`.
7. **Senhas dos `.env`.** Foram trocadas por senhas geradas aleatoriamente (como o roteiro pede) e aparecem como
   `********` nas evidências. As senhas reais estão nos arquivos `.env` de cada prática (não versionar).
8. **Prática 09, logs do Postgres.** A última linha do `docker logs lab-postgres`
   (`FATAL: database "unifeg" does not exist`) não é erro da prática: vem do `pg_isready -U unifeg` usado para
   esperar o banco ficar pronto, que sem `-d` tenta conectar num banco com o nome do usuário.
9. **Prática 09, passo 4.** Restaurar o backup por cima do banco existente gera `ERROR: relation "alunos" already
   exists` / `duplicate key` — esperado, porque os objetos já existem. Há um passo extra que apaga a tabela e
   restaura de verdade.
