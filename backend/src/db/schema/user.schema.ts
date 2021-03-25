import { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, index: true },
    uidCoinbase: {type: String, index: true },
    accessTokenCoinbase: {type: String, index: true },
    refreshTokenCoinbase: {type: String, index: true },
    username: {type: String, index: true },
    email: { type: String, index: true },
    tokenVersion: { type: Number }
})

export { UserSchema }