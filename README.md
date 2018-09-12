# Node Reference Implementaion

Reference project based on [NodeJS-Advanced-Starter](https://github.com/StephenGrider/AdvancedNodeStarter)

## Tech Stack

**Client** - Sample App written in React - Redux to test out the APIs

**API** - Express framework

**Auth** - Google OAuth using Passport

**Logging** - Winston & Morgan for request and app logging

**Caching** - Redis cache as middlware

**Data Store** - MongoDB, Mongoose

**Others** - Use of async / await, common error handling, eslint, prettier config and precommit lint check

## Local Setup & Config

```shell
npm install or yarn // Install dependencies

npm run dev or yarn dev // Run Dev environment (starts up both client & API server)

npm run build or yarn build // Prod builds for both client and API server
```

## Docker setup & Config

Make sure Docker is installed and running https://docs.docker.com/install/

```shell
cd <your root source directory>
yarn
cd <your root source directory>/api
yarn
docker-compose up
```

## Run

client - http://localhost:3000/

api - http://localhost:5000 (not exposed in docker mode)

mongo - _In Cloud_
