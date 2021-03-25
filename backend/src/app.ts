import { config } from "dotenv";
import "reflect-metadata";
import express, { json, request, Router } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Query, Resolver } from "type-graphql";
import cors from "cors";
import { MySecrets } from "./secrets";

// --- INTERFACES ---
import { AppContext, AuthRequest } from "./db/interface/context.interface";

// --- DATABASE ---
import { connect, connection } from "mongoose";

// --- RESOLVERS ---
import { UserResolver } from "./graphql/resolvers/user.resolver";
import { GitLabResolver } from "./graphql/resolvers/gitlab/gitlab.resolver";

// --- AUTHENTICATION ---
import { getUser } from "./core/services/user.auth";
import expressJwt from "express-jwt";
import { ACCESS_TOKEN_SECRET, EXPRESS_JWT_SECRET } from "./keys";

// --- ERROR HANDLING ---
import { AuthenticationError } from "apollo-server/dist/exports";

// --- REST API ROUTES ---
import { auth_routes } from "./api/authorization/routes.auth";
import { verify, decode } from "jsonwebtoken";


@Resolver()
class HelloResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!"
    }
}

const startServer = async () => {

    config();

    const app = express();

    app.use(
        cors({
            origin: 'http://localhost:4200',
            credentials: false
        })
    )

    // Apply Middleware to Include Your REST API Routes
    app.use('/', auth_routes)
    
    // This Middleware Adds the ability to verify Jwt Tokens
    app.use(
        expressJwt({
            secret: ACCESS_TOKEN_SECRET,
            algorithms: ['HS256'],
            credentialsRequired: false
        })
    );

    const schema = await buildSchema({
        resolvers: [ HelloResolver, UserResolver, GitLabResolver ]
    })

    const apolloServer = new ApolloServer({ 
        schema,
        context: (context: AppContext ) => {

            // console.log('The Issue request!: ', req.headers)

            // --- Get the user JSON WEB TOKEN from the Headers ---
            //      - this should come after the user has logged-in
            //        through Coinbase or GitLab. 
            //      - The Authentication happens outside of
            //        the GraphQL Schema.
            // const token = req.headers.authorization || '';

            // console.log('The token: ', token)

            // --- Try to Retrieve the User with the Token ---
            // const user = getUser('hello', token)
            //     .catch(err => {
            //         const user = null;
            //         console.log(err);
            //     });
            const user = context.req.user || null
            // const user = null;

            // console.log('THE CURRENT HEADERS: ', context.req.headers)
            // console.log('THE CURRENT HEADERS: ', context.req.headers.authorization)

            let token = context.req.headers.authorization?.split(' ')[1] || '';

            // console.log('The current user: ', context.req.user)
            // console.log('The decoded user: ', decode(token))

            // verify a token symmetric
            // verify(token, "aeiuworerivneiuvnuntschjsdj", function(err, decoded) {
            //     console.log('Any ERROR: ', err);
            //     console.log('Decoded: ', decoded) // bar
            //   });

            // --- Add the User to the Context ---
            return { user }

            // if (!user) throw new AuthenticationError('you are not authorized...')

            // return { user }
        }
     })

    apolloServer.applyMiddleware({ app, cors: false });

    // -------------------------------------
    // --- CONNECT YOUR MongoDB DATABASE ---
    // -------------------------------------
    const db_options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    await connect("mongodb://127.0.0.1:27017/testDatabase", db_options)
        .then((d) => {
            console.log('Connected to MongoDB database...')
        })
        .catch(error => {
            console.log(error)
        })

    app.listen(4000, () => {
        console.log('express server started');
    })
};

startServer().catch(err => console.log(err));