FROM node:12 AS client-build

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install && npm run build


FROM node:12

RUN mkdir -p /src/app

WORKDIR /src/app

COPY --from=client-build /src/app/dist ./dist

COPY package.json server.js config.js ./

RUN npm install

EXPOSE 7500

CMD ["npm", "start"]