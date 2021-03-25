# Coinbase Login - Backend

This is the backend server for the Coinbase login example with a REST API handling the Coinbase authorization and GraphQL implementing server authentication using JWT.

## Dependencies

In order to run this backend server, make sure you have MongoDB installed. Note, the npm commands in the package.json file are specifically for Ubuntu OS. If you are running in Windows or MacOS, your commands for starting a MongoDB server will be different.

## Quick Start

This backend service utilizes environment variables to run the Coinbase login process. The environment variables needed are:

    - ACCESS_TOKEN_SECRET    (any value)
    - REFRESH_TOKEN_SECRET   (any value)
    - COINBASE_CLIENT_SECRET (acquired from Coinbase)
    - COINBASE_CLIENT_ID     (acquired from Coinbase)
    - EXPRESS_JWT_SECRET     (any value)

### STEP 1: Install pacakges

```npm install```

### STEP 2: Start MongoDB Server

```npm run mongo:start```

### STEP 3: Launch Backend Server

```npm start```

## GraphQL Explorer

To access the GraphQL explorer, navigate to ```http://localhost:4000/graphql``` in your browser.