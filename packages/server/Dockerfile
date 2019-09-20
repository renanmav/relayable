FROM node:alpine

LABEL maintainer="yotta.dev<team@yotta.dev>"

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN yarn

COPY . .

RUN yarn build
CMD ["yarn", "start:prod"]
