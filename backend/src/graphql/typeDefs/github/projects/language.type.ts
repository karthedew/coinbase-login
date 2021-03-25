import { Field, Int, ObjectType } from "type-graphql";


@ObjectType()
class GitHubRepoLanguage {
    @Field(() => String)
    language: string

    @Field(() => Int)
    amount: number;
}

export { GitHubRepoLanguage }