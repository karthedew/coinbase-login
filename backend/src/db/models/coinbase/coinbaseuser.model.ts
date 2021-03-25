import { model } from "mongoose";
import { CoinbaseUserSchema } from "../../schema/coinbase/coinbaseuser.schema";
import { CoinbaseUserDocument } from "../../interface/coinbase/coinbaseuser.interface";

const CoinbaseUserModel = model<CoinbaseUserDocument>('CoinbaseUser', CoinbaseUserSchema)

export { CoinbaseUserModel }