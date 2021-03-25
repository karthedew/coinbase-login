import { Field, ObjectType } from "type-graphql";
import { GitHubRepoLanguage } from "../projects/language.type";


@ObjectType()
class GitHubProject {

    @Field(() => String)
    projectName: string;

    @Field(() => [GitHubRepoLanguage])
    languages: GitHubRepoLanguage[];
}

export { GitHubProject }