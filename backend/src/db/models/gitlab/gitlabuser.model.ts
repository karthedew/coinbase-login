import { model } from "mongoose";
import { GitlabUserSchema } from "../../schema/gitlab/gitlabuser.schema";
import { GitlabUserDocument } from "../../interface/gitlab/gitlabuser.interface";


const GitlabUserModel = model<GitlabUserDocument>('GitlabUser', GitlabUserSchema)

export { GitlabUserModel }