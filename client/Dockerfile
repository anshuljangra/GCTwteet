FROM node:lts-alpine

RUN mkdir -p /usr/src/app/gctweet-client

WORKDIR /usr/src/app/gctweet-client

COPY package.json /usr/src/app/gctweet-client
COPY package-lock.json /usr/src/app/gctweet-client

RUN npm install

COPY . /usr/src/app/gctweet-client

EXPOSE 3000

CMD [ "npm", "start" ]