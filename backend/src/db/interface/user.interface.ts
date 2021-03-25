import { Document } from "mongoose";
import { GitlabUserDocument } from "./gitlab/gitlabuser.interface";

interface UserDocument extends Document {
    name?: string,
    uidCoinbase?: string,
    accessTokenCoinbase?: string,
    refreshTokenCoinbase?: string,
    username?: string,
    email?: string,
    gitlabUser?: GitlabUserDocument
}

export { UserDocument }