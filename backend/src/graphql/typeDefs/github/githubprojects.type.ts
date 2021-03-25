import { Field, Int, ObjectType } from "type-graphql";
import { GitHubRepoLanguage } from "./projects/language.type";
import { GitHubProject } from "./projects/project.type";

// @ObjectType()
// class GitHubRepoLanguage {
//     @Field(() => String)
//     language: string;

//     @Field(() => Int)
//     amount: number;
// }


@ObjectType({ description: "Repository Information for GitHub Profile." })
class GitHubProjects {

    @Field(() => [GitHubRepoLanguage])
    languages: GitHubRepoLanguage[];

    @Field(() => [GitHubProject])
    project: GitHubProject[];
}

export { GitHubProjects }