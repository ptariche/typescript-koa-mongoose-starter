# Typescript Koa Mongoose Starter

[![Build Status](https://travis-ci.org/ptariche/typescript-koa-mongoose-starter.svg?branch=master)](https://travis-ci.org/ptariche/typescript-koa-mongoose-starter)

Typescript Koa Mongoose Starter is the beginning of folks who want to play with Typescript in the backend

# Why did I do this?

  - I wanted to entertian the idea of possibly running Typescript for our backend at my job
  - I haven't touched typescript in 6 years and wanted to see how much it has matured
  - I recently played with Deno as I love Rust and ran into several issues 

# Challenges
 - Many libraries for the backend do not have types and some of the @types libraries are out of date
 - This increased my development time by a multiple of x3 of what would normally take me to develop
 - There wasn't any historical documents or documentation I could find for many of the node modules I normally use

# Will I use Typescript in the Future for Node in the backend
 - Maybe

----
### Prerequisites

- Docker (brew cask install docker on mac)
- Mongo (The docker-compose uses Mongo:latest)
- JQ (brew install jq on mac)
- Node 10+

### Environment Variables
 - Environment variables for local development are found in config.env
 - For Docker deployments they are found in deploy.env

    ```
    PORT=3000
    MONGO_URI=mongodb://127.0.0.1:27017/test
    JWT_SECRET=12345678900987654321zxTypeScript
    APP_NAME=typescript-node-example
    ```
### Special Notes
If you wish to change the port in the env variable, make sure to change the ports inside the docker-compose file if you are using the docker-compose commands in the makefile or in package.json

### Installation
Install the dependencies and devDependencies and start the server.

```sh
$ cd typescript-koa-mongoose-starter
$ npm install
$ npm start
```

For production environments.. 0_o

```sh
$ npm install
$ npm run compose-up
```

### Development

The service runs on port 3000 by default

Want to contribute? Great! Make a Pr!

Open your favorite Terminal and run these commands.

```sh
$ npm run watch
```

#### Building for source
To release in javascript. The output is dumped in the dist folder:
```sh
$ npm run build
```

---
## Documentation

### Error Handling
 - If an error occurs that is not taken into account for the error bubbles up to the Koa Error Handleware middleware in the middleware directory, is caught and sent a 500.
 - Input validation responds with a 412 if not providated with the proper input
 
### Swagger
 - Swagger routes can be added by utilizing https://github.com/zaaack/koa-joi-swagger although there isn't a type definition file
 
### Endpoints

* Note All Posts require `Content-Type: application/json`
* Note All Authenticated posts require `Authorization Bearer <JwtToken>`

##### /user - POST

An endpoint that has input and output validation that returns the following information. The password field should be stored in Mongo cryptographically hashed

###### INPUT - JSON


|                |Type                          
|----------------|-------------------------------
|first_name          |String           
|last_name          | String
|email          |String
|password          |String

###### Output - JSON

|                |Type                          
|----------------|-------------------------------
|id | String          
|first_name          |String           
|last_name          | String
|email          |String


#### /login - POST

An endpoint that has input and output validation that returns the following information. This uses JWT Tokens.

###### Input - JSON

|                |Type                          
|----------------|-------------------------------
|email          |String           
|password          | String

###### Output - JSON


|                |Type                          
|----------------|-------------------------------
|id | String          
|token | String          

#### /user/{user_id} - GET * Authenticated Route

An Authorization Header must be present with `Bearer <jwtToken>` returned from login
An endpoint that returns the user object., and has output validation. This endpoint requires a valid JWT Token

###### Output - JSON

|                |Type                          
|----------------|-------------------------------
|id | String          
|first_name          |String           
|last_name          | String
|email          |String

#### Testing
* Uses Jest, Supertest, Chai and MongoDB Memory Server

    ```sh
    npm test
    ```
#### File Tree Source
```
-- src
    |-- .gitignore
    |-- .travis.yml
    |-- CHANGELOG.md
    |-- Dockerfile
    |-- LICENSE
    |-- README.md
    |-- config.env
    |-- deploy.env
    |-- docker-compose.yml
    |-- jest.config.js
    |-- makefile
    |-- package-lock.json
    |-- package.json
    |-- tsconfig.json
    |-- tslint.json
    |-- version.sh
    |-- src
    |   |-- db.ts
    |   |-- index.ts
    |   |-- router.ts
    |   |-- server.ts
    |   |-- controller
    |   |   |-- blackhole.ts
    |   |   |-- login.ts
    |   |   |-- user.ts
    |   |-- lib
    |   |   |-- jwt.ts
    |   |-- middleware
    |   |   |-- index.ts
    |   |-- model
    |   |   |-- user.ts
    |   |-- router
    |   |   |-- blackhole.ts
    |   |   |-- helper.ts
    |   |   |-- login.ts
    |   |   |-- user.ts
    |   |-- types
    |       |-- index.ts
    |-- test
        |-- blackhole.test.ts
        |-- login.test.ts
        |-- user.test.ts
```

Changelog
----
[Link](./CHANGELOG.md)

License
----
[MIT](./LICENSE)


Author
----
[Peter A. Tariche](https://github.com/ptariche)