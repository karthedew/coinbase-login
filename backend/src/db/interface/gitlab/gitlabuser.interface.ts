import { Document } from "mongoose";

interface GitlabUserDocument extends Document {
    gitlabName?: string,
    gitlabUsername?: string,
    uidGitlab?: string,
    accessTokenGitlab?: string,
    gitlabEmail?: string
}

export { GitlabUserDocument }