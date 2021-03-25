import { Document } from "mongoose";

interface CoinbaseUserDocument extends Document {
    coinbaseName?: string,
    coinbaseUsername?: string,
    uidCoinbase?: string,
    accessTokenCoinbase?: string,
    refreshTokenCoinbase?: string,
    coinbaseEmail?: string
}

export { CoinbaseUserDocument }