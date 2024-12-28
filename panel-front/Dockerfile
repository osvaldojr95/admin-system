FROM node:18 as builder

WORKDIR /app

COPY . /app/

RUN npm install

RUN npm run build:docker

FROM nginx:1.15.0

COPY --from=0 /app/dist /var/www/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d