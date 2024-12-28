FROM node:16.15.0-alpine

WORKDIR /usr/src/

COPY . /usr/src/

RUN npm i

RUN mkdir -p /usr/src/uploads

CMD ["npm", "run", "docker:start"]