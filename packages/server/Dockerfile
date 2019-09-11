FROM node:latest

LABEL maintainer="yotta.dev<team@yotta.dev>"

RUN mkdir /usr/api
WORKDIR /usr/api

COPY package.json .
RUN yarn

COPY . .

RUN yarn build
CMD ["yarn", "start:prod"]
