FROM node:latest as build

WORKDIR /app

COPY package.json /app

COPY src .

RUN npm install

RUN npm run build

FROM node:latest

WORKDIR /app

COPY --from=build /build /app

EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ]