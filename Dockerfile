FROM node:8.11.3-alpine

RUN mkdir /opt/node-ref-app

WORKDIR /opt/node-ref-app

COPY package.json yarn.lock ./
RUN yarn
ENV PATH /opt/node-ref-app/node_modules/.bin:$PATH

COPY . /api /opt/node-ref-app/

WORKDIR /opt/node-ref-app