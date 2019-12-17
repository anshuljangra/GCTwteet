FROM node:lts-alpine

RUN mkdir -p /usr/src/app/gctweet-server

WORKDIR /usr/src/app/gctweet-server

COPY package.json /usr/src/app/gctweet-server
COPY package-lock.json /usr/src/app/gctweet-server

RUN npm install

COPY . /usr/src/app/gctweet-server

EXPOSE 3005

# You can change this
CMD [ "node", "app"]