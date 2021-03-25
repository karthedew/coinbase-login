import { Query, Resolver } from "type-graphql";
import { LabProjet } from "../../typeDefs/gitlab/projects.type";


/*
    class - GitLab Searh 

    This class does the querying for global search across the GitLab network.

    Queries:

        1] Programming Languages
        2] Number of commits in the last XX Days.
        3] 

*/
@Resolver()
class GitLabSearchResolver {

    //  =======================
    //  --- QUERY FUNCTIONS ---
    //  =======================
    @Query(() => String)
    async gitlabUserSearch(user:string) {
        return "true"
    }


    @Query(() => String)
    async gitlabProjectSearch(users:string) {
        return "true"
    }

    @Query(() => Boolean)
    async gitlabMergeRequests(mergeRequests:number) {
        return true
    }

    @Query(() => Boolean)
    async gitlabCommits(commits:number) {
        return true
    }

    @Query(() => Boolean)
    async gitlabGroup(group:string) {
        return true
    }

}

export { GitLabSearchResolver }