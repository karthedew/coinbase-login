import { Router } from "express";
import * as crypto from 'crypto';
import { stringify } from "qs";


// --- IMPORTS FOR HTTP REQUESTS ---
import * as http from 'http'
import * as https from 'https'

// --- IMPORT SERVICES ---
import { mintAuthToken, getUser, mintGitlabAuthTokens } from "../../core/services/user.auth";


// --- GLOBAL AUTH VARIABLES ---
const auth_routes = Router();

/*
    GET request for Coinbase Login
*/
auth_routes.get("/api/auth/coinbase/login", (_req, res) => {

    let BASE = 'https://www.coinbase.com/oauth/authorize?';
    let SECURE_RANDOM = crypto.randomBytes(20).toString('hex')
    let YOUR_REDIRECT_URL = "http://localhost:4200/redirect";
    const queryParams = {
      'response_type': 'code',
      'client_id': process.env.COINBASE_CLIENT_ID,
      'redirect_uri': YOUR_REDIRECT_URL,
      'state': SECURE_RANDOM,
      'scope':'wallet:accounts:read'
    }

    // res.send(result);

    const endpoint = BASE + stringify(queryParams)

    res.redirect(endpoint)
})

/*
    GET request for getting Coinbase access and refresh tokens.
        - grant_type
        - code
        - client_id
        - client_secret
        - redirect_id
*/
auth_routes.get('/api/auth/coinbase', (req, res) => {

    return mintAuthToken(req)
        .then(authToken => res.json({ authToken }))
        .catch(err => console.log(err))
})


// =========================
// GitLab Login
// =========================
/*

*/
auth_routes.get('/api/auth/gitlab/login', (req, res) => {

    let APP_ID = process.env.GITLAB_CLIENT_ID;
    let REDIRECT_URI = 'http://localhost:4200/redirect';
    let RESPONSE_TYPE = 'token';
    let UNIQUE_STATE_HASH = crypto.randomBytes(20).toString('hex');
    let REQUESTED_SCOPES = 'read_user+profile';

    let send = `https://gitlab.com/oauth/authorize?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&state=${UNIQUE_STATE_HASH}&scope=${REQUESTED_SCOPES}`

    res.redirect(send);
})

/*
    GET request for getting Coinbase access and refresh tokens.
        - grant_type
        - code
        - client_id
        - client_secret
        - redirect_id
*/
auth_routes.get('/api/auth/gitlab', (req, res) => {

    return mintGitlabAuthTokens(req)
        .then(authToken => res.json({ authToken }))
        .catch(err => console.log(err))
})


export { auth_routes };