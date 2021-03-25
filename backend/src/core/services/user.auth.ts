import { User } from "../../graphql/typeDefs/user.type";
import axios from "axios";
import { stringify } from "qs";

// --- IMPORT SECRET KEYS ---
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../keys";
import { sign } from "jsonwebtoken";
import { query } from "express";
import { Resolver } from "type-graphql";

// 




/*
getUser

    This function query's the backend to see if a user exists and returns 
    that user or NULL.

    Parameters
    ----------

    username : string
        - The username to query.

*/
async function getUser(username:string): Promise<any> {

    const user =  await User.findOne({where: { username }})

    if(!user) {
        throw new Error('User does not exist')
    }

    return user
}


/*
getUser

    This function query's the backend to see if a user exists and returns 
    that user or NULL.

    Parameters
    ----------

    username : string
        - The username to query.
    
    token : string
        - The JWT token necessary to validate request author.

*/
async function mintAuthToken(req: any): Promise<any> {

    const BASE = 'https://api.coinbase.com/oauth/token?';
    const REDIRECT_ID = 'http://localhost:4200/redirect';
    const GRANT_TYPE = 'authorization_code';
    const CODE = req.query.code;

    const queryParams = {
        grant_type: GRANT_TYPE,
        code: CODE,
        client_id: process.env.COINBASE_CLIENT_ID,
        client_secret: process.env.COINBASE_CLIENT_SECRET,
    }
    const redirect_uri = `&redirect_uri=${REDIRECT_ID}`
    const endpoint = BASE + stringify( queryParams ) + redirect_uri;
    
    const login = await axios.post(endpoint)    
    const Coinbase_accessToken = login.data.access_token;
    const Coinbase_refreshToken = login.data.refresh_token;
    const version = login.data.version;

    // accessToken is the Coinbase accessToken.
    const user = await getCoinbaseUser(Coinbase_accessToken);
    const uid = 'coinbase:' + user.data.data.id;
    const name = user.data.name;


    const newUser = await loginCoinbaseUser(uid, user.data.data.name, Coinbase_accessToken, Coinbase_refreshToken);

    const accessToken = createAccessToken(newUser);
    const refreshToken = createRefreshToken(newUser);

    let results = {
        'accessToken': accessToken,
        'refreshToken': refreshToken
    }

    // console.log('The Application Access Token: ', accessToken)
    // console.log('The Application Refresh Token: ', refreshToken)
    

    return results
}

async function mintGitlabAuthTokens(req:any): Promise<any> {
    
    console.log(req.query.accessToken);

    const user = await getGitlabUser(req.query.accessToken);

    const uid = 'gitlab:' + user.data.id;
    const name = user.data.name;
    const username = user.data.username;
    const gitlab_url = user.data.web_url;

    loginGitlabUser(uid, name)

    // console.log('Here is the gitlab user: ', user);



    // We want to make a GitLab request to figure out who the user is.

    // - Either login the user, or add a user to the login.
    
    let results = {
        'accessToken': 'accessToken',
        'refreshToken': 'refreshToken'
    }

    // console.log('The Application Access Token: ', accessToken)
    // console.log('The Application Refresh Token: ', refreshToken)
    

    return results
}


/*
getUser

    This function query's the backend to see if a user exists and returns 
    that user or NULL.

    Parameters
    ----------

    username : string
        - The username to query.
    
    token : string
        - The JWT token necessary to validate request author.

*/
async function getCoinbaseUser(accessToken: any): Promise<any> {
    const userUrl = 'https://api.coinbase.com/v2/user';

    const user = await axios.get(userUrl, { headers: { 'Authorization': `Bearer ${accessToken}` } });

    return user
}

async function getGitlabUser(accessToken: string): Promise<any> {
    const userUrl = 'https://gitlab.com/api/v4/user';

    const user = await axios.get(userUrl, { headers: { 'Authorization': `Bearer ${accessToken}` } });

    return user
}


/*
getUser

    This function query's the backend to see if a user exists and returns 
    that user or NULL.

    Parameters
    ----------

    username : string
        - The username to query.
    
    token : string
        - The JWT token necessary to validate request author.

*/
function loginCoinbaseUser(uid: string, name: string, accessTokenCoinbase: string, refreshTokenCoinbase: string): Promise<any> {

    return new Promise<any> ((resolve, reject) => {
        User.findOne({
            uidCoinbase: uid
        }).then(user => {
            if (!user) {
                const user = new User({
                    uidCoinbase: uid,
                    name: name,
                    accessTokenCoinbase: accessTokenCoinbase,
                    refreshTokenCoinbase: refreshTokenCoinbase
                })
                
                // save 
                user.save()
                    .then(user => {
                        user.save()
                        resolve(user)
                    }).catch(err => {
                        throw new Error (`You got an error creating a new user: ${err}`)
                    })
            } else {
                resolve(user)
            }
        }).catch(err => {
            reject(err)
            throw new Error('Registering/Logging in user not permitted...')
        })
    }) 
}

/*
loginGitlabUser

    This function query's the backend to see if a user exists and returns 
    that user or NULL.

    Parameters
    ----------

    username : string
        - The username to query.
    
    token : string
        - The JWT token necessary to validate request author.

*/
function loginGitlabUser(uid: string, name: string): Promise<any> {

    return new Promise<any> ((resolve, reject) => {
        User.findOne({
            'gitlabUser.uidGitlab': uid
        }).then(async user => {
            if(!user) {
                const user = await createUser('gitlab', name, uid);

                console.log('You are loggin in the GitLab User: ', user);
            } else {
                resolve(user)
            }
        }).catch(err => {
            reject(err);
            throw new Error('Registering/Logging in user not permitted...')
        })
    })
    
    // return new Promise<any> ((resolve, reject) => {
    //     User.findOne({
    //         uidCoinbase: uid
    //     }).then(user => {
    //         if (!user) {
    //             const user = new User({
    //                 uidCoinbase: uid,
    //                 name: name
    //             })
                
    //             // save 
    //             user.save()
    //                 .then(user => {
    //                     user.save()
    //                     resolve(user)
    //                 }).catch(err => {
    //                     throw new Error (`You got an error creating a new user: ${err}`)
    //                 })
    //         } else {
    //             resolve(user)
    //         }            
    //     }).catch(err => {
    //         reject(err)
    //         throw new Error('Registering/Logging in user not permitted...')
    //     })
    // }) 
}


/*

*/
async function createUser(loginType: string, name:string, uid:string) {

   
    if(loginType === 'gitlab') {
        const user = new User({
            name: name,
            gitlabUser: {
                gitlabName: name,
                uidGitlab: uid
            }
        })

        // user.gitlabUser.gitlabName = name;

        console.log('This is the new user!', user);

        user.save()
            .then(user => {
                console.log('the saved user: ', user)
                return user
            })

        return user
    }

    if(loginType === 'coinbase') {
        console.log('Coinbase login')
    }
    // const user = new User({
    //     name: name
    // })

    // user.save()

    return 'user'
}


/*
getUser

    This function query's the backend to see if a user exists and returns 
    that user or NULL.

    Parameters
    ----------

    username : string
        - The username to query.
    
    token : string
        - The JWT token necessary to validate request author.

*/
async function checkUserExistence(uid: string): Promise<any> {

    const usr = await User.findOne({uidCoinbase: uid})

    if(!usr) {
        return false
    } else {
        return true
    }
}



/*
getUser

    This function query's the backend to see if a user exists and returns 
    that user or NULL.

    Parameters
    ----------

    username : string
        - The username to query.
    
    token : string
        - The JWT token necessary to validate request author.

*/
function createAccessToken(user: User) {

    return sign(
        { userId: user.id },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m"
        }
    )
}


/*
getUser

    This function query's the backend to see if a user exists and returns 
    that user or NULL.

    Parameters
    ----------

    user : string
        - The username to query.
    
    token : string
        - The JWT token necessary to validate request author.

*/
function createRefreshToken(user: User) {

    return sign(
        { userId: user.id },
        REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d"
        }
    )
}

export { getUser, mintAuthToken, getCoinbaseUser, loginCoinbaseUser, mintGitlabAuthTokens }