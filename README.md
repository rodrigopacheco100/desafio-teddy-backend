# <img src="https://teddydigital.io/wp-content/uploads/2022/10/Ativo-13-8.png" width=40 /> Desafio Teddy - Encurtador de URL

## Pré requisitos
- [NodeJS](https://nodejs.org/en/download/)
- [Docker e Docker Compose](https://docs.docker.com/engine/install/)

## O que foi utilizado:
- NodeJS
- TypeScript
- NestJS
- PrismaORM
- Zod
- Vitest
- Github Actions
- Vercel

## Como rodar a aplicação
- Primeiramente é necessário criar uma instância do PostgreSQL usando o ```docker-compose.yaml``` usando o comando:
```bash
docker compose up -d
```
- Com o banco criado, basta utilizar o comando à seguir para iniciar a aplicação:
```bash
npm run start:dev
```
- A aplicação estará ouvindo a porta 3000 do seu localhost

- [Documentação do Swagger](http://localhost:3000/swagger)

## Testes unitários
  A aplicação possui testes unitários. Para rodar os testes, use o comando:
```bash
npm run test
```

## Deploy realizado na [Vercel](https://vercel.com/)
- [Documentação do Swagger](https://desafio-teddy-backend.vercel.app/swagger)

## Pontos de melhoria
- Cacheamento
- Rate limiter
- Integração com uma ferramenta para medir a performance da aplicação
