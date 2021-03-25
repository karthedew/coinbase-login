import { Schema } from "mongoose";

const GitlabUserSchema = new Schema({
    gitlabName: {
        type: String,
        index: true
    },
    uidGitlab: {
        type: String,
        index: true
    },
    gitlabUsername: {
        type: String,
        index: true
    },
    accessTokenGitlab: {
        type: String
    },
    gitlabEmail: {
        type: String
    }
})

export { GitlabUserSchema }