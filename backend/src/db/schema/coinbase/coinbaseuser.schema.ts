import { Schema } from "mongoose";

const CoinbaseUserSchema = new Schema({
    coinbaseName: {
        type: String,
        index: true
    },
    coinbaseUsername: {
        type: String,
        index: true
    },
    uidCoinbase: {
        type: String,
        index: true
    },
    accessTokenCoinbase: {
        type: String,
        index: true
    },
    refreshTokenCoinbase: {
        type: String,
        index: true
    },
    coinbaseEmail: {
        type: String
    }
})

export { CoinbaseUserSchema }