import { Field, ID, ObjectType } from "type-graphql";
import { GitlabUserModel } from "../../../db/models/gitlab/gitlabuser.model";


@ObjectType({ description: "User info for GitLab" })
class GitlabUser extends GitlabUserModel {
    
    @Field(type => ID)
    id: string;
    
    @Field(() => String)
    gitlabName: string;

    @Field(() => String)
    uidGitlab: string;

    @Field(() => String)
    gitlabUsername: string;

    @Field(() => String)
    accessTokenGitlab: string;

    @Field(() => String)
    gitlabEmail: string;

}

export { GitlabUser }