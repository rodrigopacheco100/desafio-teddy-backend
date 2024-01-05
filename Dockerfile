FROM node:18-bullseye-slim AS builder

COPY . .

RUN npm install
RUN npm run build

FROM node:18-alpine

COPY --from=builder /dist /dist
COPY --from=builder package.json .
COPY --from=builder package-lock.json .

RUN npm install --production --ignore-scripts

COPY  --from=builder /node_modules/.prisma/client /node_modules/.prisma/client

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
