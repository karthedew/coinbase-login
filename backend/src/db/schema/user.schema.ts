import { Schema } from "mongoose";
import { GitlabUserSchema } from "./gitlab/gitlabuser.schema";
import { CoinbaseUserSchema } from "./coinbase/coinbaseuser.schema";


const UserSchema = new Schema({
    name: { type: String, index: true },
    uidCoinbase: {type: String, index: true },
    accessTokenCoinbase: {type: String, index: true },
    refreshTokenCoinbase: {type: String, index: true },
    username: {type: String, index: true },
    email: { type: String, index: true },
    tokenVersion: { type: Number },
    gitlabUser: GitlabUserSchema,
    coinbaseUser: CoinbaseUserSchema
})

export { UserSchema }