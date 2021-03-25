import { Document } from "mongoose";

interface UserDocument extends Document {
    name?: string,
    uidCoinbase?: string,
    accessTokenCoinbase?: string,
    refreshTokenCoinbase?: string,
    username?: string,
    email?: string,
}

export { UserDocument }