FROM node:10-alpine

RUN mkdir /opt/node-ref-app

WORKDIR /opt/node-ref-app

# install and cache app dependencies
COPY package.json yarn.lock ./opt/node-reg-app/

COPY . /api /opt/node-ref-app/
