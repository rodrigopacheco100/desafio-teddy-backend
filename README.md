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

## Variáveis ambiente
As variáveis ambiente necessárias são:
- APP_BASE_URL - necessário para ter a url base do domínio para a criação da url final do redirecionamento
- DATABASE_URL - necessário para a conexão do banco de dados dependendo do ambiente que a aplicação está funcionando
- JWT_SECRET - necessário para manter uma diferença entre produção e outros ambientes na geração do JWT por uma questão de segurança

## Deploy realizado na [Vercel](https://vercel.com/)
- [Documentação do Swagger](https://desafio-teddy-backend.vercel.app/swagger)

## Pontos de melhoria
- Cacheamento
- Rate limiter
- Integração com uma ferramenta para medir a performance da aplicação
- Kubernetes para gerenciamento de containers da aplicação, para manter um maior uptime possível
