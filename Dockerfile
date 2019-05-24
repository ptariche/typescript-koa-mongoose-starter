FROM node:10.15

ENV SOURCE=/opt/app/koa-mongoose-start

RUN mkdir -p $SOURCE
WORKDIR $SOURCE

COPY ./package-lock.json $SOURCE/package-lock.json
COPY ./package.json $SOURCE/package.json
COPY ./tsconfig.json $SOURCE/tsconfig.json

RUN npm install

COPY ./src/ $SOURCE/src/

EXPOSE 3000 3000

ENV TS_NODE=${SOURCE}/node_modules/.bin/ts-node
ENV TS_EXEC=${SOURCE}/src/index.ts

CMD $TS_NODE $TS_EXEC